import { Service } from "typedi";
import sequelize from "@/config/db";
import userModel from "@/models/user.model";
import loginModel from "@/models/login.model";
import { createSalt, createToken } from "@/utils/crypt";
import { AUTH_MESSAGE, EUserStatus } from "@/constants/auth";
import * as EXCEPTION from "@/config/exception";
import type * as userInterface from "@/interface/user";
import { getRedis } from "@/utils/redis";

@Service()
export default class UserService {
  // 登录逻辑
  public signIn = async (params: userInterface.IUserParams) => {
    const t = await sequelize.transaction();
    try {
      const loginUser = await userModel.findOne({
        attributes: ["id", "name", "salt", "hash"],
        where: {
          name: params.userName,
        },
      });
      if (!loginUser) {
        throw new EXCEPTION.AuthFailed(AUTH_MESSAGE.NO_USER);
      } else {
        const { salt, id: userId, hash } = loginUser;
        const token = createToken(params.password, salt);
        if (hash === token) {
          const insertToLogin = await loginModel.create(
            {
              userId,
              token,
              status: EUserStatus.loginEd,
              origin: params.origin,
            },
            { transaction: t }
          );
          await t.commit();
          return insertToLogin.token;
        } else {
          throw new EXCEPTION.AuthFailed(AUTH_MESSAGE.INCORRECT_PASSWORD);
        }
      }
    } catch (error) {
      await t.rollback();
      throw new EXCEPTION.AuthFailed(error.message, error.code);
    }
  };

  // 注册逻辑
  public signUp = async (params: userInterface.IUserParams) => {
    const redisCaptcha = await getRedis(params.uuid);
    // 如果验证码不正确，直接返回
    if (redisCaptcha !== params.captchaText) {
      throw new EXCEPTION.Exception(AUTH_MESSAGE.INCORRECT_CAPTCHA);
    }
    const salt = createSalt();
    const hash = createToken(params.password, salt);
    const t = await sequelize.transaction();
    try {
      const registeredRet = await userModel.create(
        {
          name: params.userName,
          salt,
          hash,
        },
        { transaction: t }
      );
      await loginModel.create(
        {
          userId: registeredRet.id,
          token: hash,
          status: EUserStatus.loginEd,
          origin: params.origin,
        },
        { transaction: t }
      );
      await t.commit();
      return hash;
    } catch (error) {
      console.log(error);
      await t.rollback();
      throw new EXCEPTION.Exception(error.message);
    }
  };

  // 退出登录
  public signOut = async (token) => {
    let ret = await loginModel.update(
      {
        status: EUserStatus.loginOut,
      },
      {
        where: {
          token,
        },
      }
    );
    return ret[0] === 1;
  };

  // 校验 token 有效性
  public verifyToken = async (token) => {
    const ret = await loginModel.findOne({
      attributes: ["id", "token"],
      where: {
        token,
        status: EUserStatus.loginEd,
      },
    });
    return !!ret;
  };

  // 根据 token 获取用户信息
  public getUserInfo = async (token) => {
    const ret = await loginModel.findAll({
      where: {
        token,
        status: EUserStatus.loginEd,
      },
      include: {
        model: userModel,
        required: false,
      },
    });
    return ret;
  };
}
