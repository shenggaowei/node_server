import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export default class ErrorMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<any> {
    try {
      await next();
    } catch (error) {
      const { message, code, status } = error;
      ctx.status = status || 200;
      ctx.body = {
        data: {},
        code,
        message,
        extra: {},
      };
    }
  }
}
