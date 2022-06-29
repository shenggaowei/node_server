import { JsonController,Body,Post} from 'routing-controllers';
import { Service } from 'typedi';
import * as userService from '@/service/user'
import { ILoginParams } from '@/interface/user';

@JsonController()
@Service()
export class UserController {
  @Post('/login')
  async login(@Body() userInfo: ILoginParams) {
    const ret = await userService.login(userInfo)
    return ret
  }

  @Post('/register')
  async register(@Body() userInfo: ILoginParams) {
    const token = await userService.register(userInfo)
    return token
  }
}