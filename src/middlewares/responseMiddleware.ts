import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { toCamelCase } from "@/utils";

@Middleware({ type: "after" })
@Service()
export default class ResponseMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<any> {
    await next();
    ctx.status = ctx.status || 200;
    const camelCaseBody = toCamelCase(ctx.body);
    ctx.body = {
      code: 0,
      data: camelCaseBody,
      message: ctx.message,
      extra: {},
    };
  }
}
