import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: "before" })
@Service()
export default class ErrorMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<any> {
    try {
      await next();
    } catch (error) {
      const { message, code } = error;
      ctx.status = 200;
      ctx.body = {
        data: {},
        code,
        message,
        extra: {},
      };
    }
  }
}
