import { WhereOptions } from "@sequelize/core";
import { Service } from "typedi";
import sequelize from "@/config/db";
import Auth from "@/model/auth";
import UserLogin from "@/model/user_login";
import { createSalt, createToken } from "@/helpers/crypt";
import { AUTH_MESSAGE, EUserStatus } from "@/constants/auth";
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
        } as WhereOptions,
      });
      if (!loginUser) {
        throw new EXCEPTION.AuthFailed(AUTH_MESSAGE.NO_USER)
      } else {
        const { salt, id: user_id, hash } = loginUser
        const token = createToken(params.password, salt)
        if (hash === token) {
          const insertToLogin = await UserLogin.create(
            {
              user_id,
              token,
              status: EUserStatus.loginEd,
              origin: params.origin
            },
            { transaction: t }
          );
          return insertToLogin.token
        } else {
          throw new EXCEPTION.AuthFailed(AUTH_MESSAGE.INCORRECT_PASSWORD)
        }
      }
    } catch (error) {
      await t.rollback();
      throw new EXCEPTION.AuthFailed(error.message, error.code);
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
          origin: params.origin
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
        status: EUserStatus.loginEd,
      } as WhereOptions,
    });
    return !!ret
  };
}

