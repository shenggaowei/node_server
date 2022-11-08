import {
  JsonController,
  Body,
  Post,
  UseBefore,
  Get,
} from "routing-controllers";
import { Service } from "typedi";
import UserService from "@/service/user";
import { IUserParams } from "@/interface/user";
import AuthCheckMiddleware from "@/middlewares/authCheckMiddleware";

@JsonController()
@Service()
export default class UserController {
  constructor(private authService: UserService) { }

  @Get("/mock-data")
  async getMockData(@Body() authInfo: IUserParams) {
    return {
      country: 'china',
      province: '山东',
      name: "升高",
      age: 18,
      height: 185,
    };
  }

  @Post("/sign-in")
  async signIn(@Body() authInfo: IUserParams) {
    const token = await this.authService.signIn(authInfo);
    return {
      token,
    };
  }

  @Post("/sign-up")
  async signUp(@Body() authInfo: IUserParams) {
    const token = await this.authService.signUp(authInfo);
    return {
      token,
    };
  }

  @Post("/sign-out")
  @UseBefore(AuthCheckMiddleware)
  async signOut(@Body() params: { token: string }) {
    const isSuccess = await this.authService.signOut(params.token);
    return isSuccess;
  }
}
