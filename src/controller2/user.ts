import * as Koa from "koa";
import * as userService from "../service/user";
import type * as userInterface from '../interface/user'
import type { IUser } from "../interface/user";

export const login = async (ctx: Koa.Context) => {
  const params = ctx.request.body as IUser;
  const ret = await userService.login(params)
  ctx.body = ret;
};

export const register = async (ctx: Koa.Context) => {
  const data = ctx.request.body as userInterface.IUser
  const token = await userService.register(data)
  ctx.body = {
    token
  }
}
