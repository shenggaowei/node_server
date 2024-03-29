import { HTTP_CODE } from "@/constants/exception_info";
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
      let { message, code = HTTP_CODE, status, errors } = error;
      ctx.status = status || 200;
      if (errors) {
        message = errors
          .map((ele) => {
            return Object.keys(ele.constraints).reduce((info, key) => {
              const value = ele.constraints[key];
              return info.concat(value);
            }, []);
          })
          .flat()
          .join("; ");
      }
      ctx.body = {
        data: {},
        code,
        message: message,
        extra: {},
      };
    }
  }
}
