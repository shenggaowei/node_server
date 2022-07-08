import { JsonController, Body, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import AuthService from "@/service/auth";
import { IAuthParams } from "@/interface/auth";
import AuthCheckMiddleware from "@/middlewares/authCheckMiddleware";

@JsonController()
@Service()
export default class UserController {
  constructor(private authService: AuthService) {}

  @Post("/sign-in")
  async signIn(@Body() authInfo: IAuthParams) {
    const token = await this.authService.signIn(authInfo);
    return {
      token
    };
  }

  @Post("/sign-up")
  async signUp(@Body() authInfo: IAuthParams) {
    const token = await this.authService.signUp(authInfo);
    return {
      token
    };
  }

  @Post("/sign-out")
  @UseBefore(AuthCheckMiddleware)
  async signOut(@Body() params: { token: string }) {
    const isSuccess = await this.authService.signOut(params.token);
    return isSuccess;
  }
}
