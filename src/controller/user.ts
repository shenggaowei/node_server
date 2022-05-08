import * as Koa from "koa";
import * as userService from "../service/user";
import * as weixinService from "../service/weixin";
import { appid, appsecret } from "../config/app_info";

interface ILoginQuery {
  code: string;
}
export const login = async (ctx: Koa.Context, next: Koa.Next) => {
  const params: ILoginQuery = ctx.request.query;
  const data = await weixinService.getWexinSession({
    appid,
    secret: appsecret,
    js_code: params.code,
    grant_type: "authorization_code",
  });
  ctx.body = data;
};
