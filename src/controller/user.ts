import * as Koa from "koa";
import * as userService from "../service/user";
import * as weixinService from "../service/weixin";
import type * as userInterface from '../interface/user'
import { appid, appsecret } from "../config/app_info";

interface ILoginQuery {
  code: string;
}

export const login = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body as ILoginQuery;
  const data = await weixinService.getWexinSession({
    appid,
    secret: appsecret,
    js_code: params.code,
    grant_type: "authorization_code",
  });
  ctx.body = data;
};

export const register = async (ctx: Koa.Context, next: Koa.Next) => {
  const data = ctx.request.body as userInterface.IUser
  const token = await userService.register(data)
  ctx.body = {
    token
  }
}
