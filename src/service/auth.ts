import { Op, WhereOptions } from '@sequelize/core'
import { Service } from 'typedi';
import sequelize from '../config/db';
import Auth from "../model/auth";
import UserLogin from '../model/user_login'
import { createSalt, createToken } from "../utils/crypt";
import type * as authInterface from '../interface/auth'

@Service()
export default class AuthService {
  public signIn = async (params: authInterface.IAuthParams) => {
    const t = await sequelize.transaction();
    try {
      const loginUser = await Auth.findOne({
        attributes: ['id', 'name', 'salt', 'hash'],
        where: {
          name: {
            [Op.eq]: params.userName
          },
        } as WhereOptions
      })
      if (!loginUser) {
        return {}
      } else {
        const { salt, id: user_id, hash } = loginUser
        const token = createToken(params.password, salt)
        if (hash === token) {
          const insertToLogin = await UserLogin.create({
            user_id,
            token,
            status: '2'
          }, { transaction: t })
          return insertToLogin
        } else {
          return {
            message: '密码不对'
          }
        }
      }
    } catch (error) {
      await t.rollback()
      throw new Error('错误')
    }
  }

  public signUp = async (params: authInterface.IAuthParams) => {
    const salt = createSalt()
    const hash = createToken(params.password, salt)
    const t = await sequelize.transaction();
    try {
      const registeredRet = await Auth.create({
        name: params.userName,
        salt,
        hash 
      }, { transaction: t })
       await UserLogin.create({
        user_id: registeredRet.id, 
        token: hash,
      }, { transaction: t })
      await t.commit()
      return hash
    } catch (error) {
      await t.rollback()
      throw new Error('错误')
    }
  }
}
