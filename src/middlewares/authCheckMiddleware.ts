import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import AuthService from "@/service/auth";
import * as exception_info from "@/constants/exception_info";

@Middleware({ type: "before" })
@Service()
export default class AuthCheckMiddleware implements KoaMiddlewareInterface {
  constructor(private authService: AuthService) {}

  async use(context: Context, next: Next): Promise<any> {
    const isLogin = await this.authService.verifyToken(
      context.request.body.token
    );
    if (isLogin) {
      await next();
    } else {
      context.body = {
        data: {},
        code: exception_info.AUTH_FAILED_CODE,
        message: exception_info.AUTH_FAILED_MESSAGE,
        extra: {},
      };
    }
  }
}
