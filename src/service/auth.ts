import { WhereOptions } from "@sequelize/core";
import { Service } from "typedi";
import sequelize from "@/config/db";
import Auth from "@/model/auth";
import UserLogin from "@/model/user_login";
import { createSalt, createToken } from "@/helpers/crypt";
import { EUserStatus } from "@/constants/auth";
import * as EXCEPTION from "@/config/exception";
import type * as authInterface from "@/interface/auth";

@Service()
export default class AuthService {
  public signIn = async (params: authInterface.IAuthParams) => {
    const t = await sequelize.transaction();
    try {
      const loginUser = await Auth.findOne({
        attributes: ["id", "name", "salt", "hash"],
        where: {
          name: params.userName,
          status: EUserStatus.loginEd,
        } as WhereOptions,
      });
      if (!loginUser) {
        return {
          token: "",
          message: "暂无此用户",
        };
      } else {
        const { salt, id: user_id, hash } = loginUser;
        const token = createToken(params.password, salt);
        if (hash === token) {
          const insertToLogin = await UserLogin.create(
            {
              user_id,
              token,
              status: EUserStatus.loginEd,
            },
            { transaction: t }
          );
          return {
            token: insertToLogin.token,
            message: "",
          };
        } else {
          return {
            message: "密码不对",
            token: "",
          };
        }
      }
    } catch (error) {
      await t.rollback();
      throw new EXCEPTION.Exception(error.message);
    }
  };

  public signUp = async (params: authInterface.IAuthParams) => {
    const salt = createSalt();
    const hash = createToken(params.password, salt);
    const t = await sequelize.transaction();
    try {
      const registeredRet = await Auth.create(
        {
          name: params.userName,
          salt,
          hash,
        },
        { transaction: t }
      );
      await UserLogin.create(
        {
          user_id: registeredRet.id,
          token: hash,
          status: EUserStatus.loginEd,
        },
        { transaction: t }
      );
      await t.commit();
      return hash;
    } catch (error) {
      await t.rollback();
      throw new EXCEPTION.Exception(error.message);
    }
  };

  public signOut = async (token) => {
    let ret = await UserLogin.update(
      {
        status: EUserStatus.loginOut,
      },
      {
        where: {
          token,
        } as WhereOptions,
      }
    );
    return ret[0] === 1;
  };

  public verifyToken = async (token) => {
    const ret = await UserLogin.findOne({
      attributes: ["id", "token"],
      where: {
        token,
        status: EUserStatus.loginEd + "",
      } as WhereOptions,
    });
    if (ret) {
      return true;
    }
    return false;
  };
}
