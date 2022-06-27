import { Op, WhereOptions } from '@sequelize/core'
import sequelize from '../config/db';
import User from "../model/user";
import UserLogin from '../model/user_login'
import { createSalt, createToken } from "../utils/crypt";
import type * as userInterface from '../interface/user'

export const getUser = async () => {
  const users = await User.findAll({
    attributes: ["id", "name"],
  });
  return users;
};

export const register = async (params: userInterface.IUser) => {
  const salt = createSalt()
  const hash = createToken(params.password, salt)
  const t = await sequelize.transaction();
  try {
    // user 表中添加用户信息
    const registeredRet = await User.create({
      name: params.userName,
      salt,
      hash 
    }, { transaction: t })
    // 登录表中添加 token
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

export const login = async (params: userInterface.IUser) => {
  const t = await sequelize.transaction();
  try {
    // todo? 查询条件 where 语句的 ts 飘红问题，暂时用 as 进行处理
    const loginUser = await User.findOne({
      attributes: ['id', 'name', 'salt', 'hash' ],
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
