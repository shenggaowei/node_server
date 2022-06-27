import * as crypto from 'crypto' 
import sequelize from '../config/db';
import User from "../model/user";
import UserLogin from '../model/user_login'
import { createSalt } from "../utils/crypt";
import type * as userInterface from '../interface/user'

export const getUser = async () => {
  const users = await User.findAll({
    attributes: ["id", "name"],
  });
  return users;
};

export const register = async (params: userInterface.IUser) => {
  const salt = createSalt()
  const token = crypto.createHmac('sha256', salt).update(params.password).digest('hex')
  const t = await sequelize.transaction();
  try {
    // user 表中添加用户信息
    const registeredRet = await User.create({
      name: params.userName,
      salt
    }, { transaction: t })
    // 登录表中添加 token
     await UserLogin.create({
      user_id: registeredRet.id, 
      token,
    }, {transaction: t})
    await t.commit()
    return token
  } catch (error) {
    await t.rollback()
  }
}
