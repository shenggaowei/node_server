import { Context, Next } from "koa";
import { KoaMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import AuthService from "@/service/auth";
import * as exception_info from "@/constants/exception_info";

@Service()
export default class AuthCheckMiddleware implements KoaMiddlewareInterface {
  constructor(private authService: AuthService) {}

  async use(context: Context, next: Next): Promise<any> {
    const token = context.request.body.token;
    const isLogin = !!token && await this.authService.verifyToken(token);
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
