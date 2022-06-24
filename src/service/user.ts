import * as crypto from 'crypto' 
import User from "../model/user";
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
  return token
}
