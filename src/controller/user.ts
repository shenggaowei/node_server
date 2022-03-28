import * as Koa from "koa";
import * as userService from "../service/user";

export const login = async (ctx: Koa.Context, next: Koa.Next) => {
  const ret = await userService.getUser();
  console.log(ret);
  ctx.body = ret;
};
