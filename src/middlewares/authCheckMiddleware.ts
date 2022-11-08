import { Context, Next } from "koa";
import { KoaMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import userService from "@/service/user";
import * as exception_info from "@/constants/exception_info";

@Service()
export default class AuthCheckMiddleware implements KoaMiddlewareInterface {
  constructor(private userService: userService) { }

  async use(context: Context, next: Next): Promise<any> {
    const token = context.request.body.token;
    const isLogin = !!token && (await this.userService.verifyToken(token));
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
