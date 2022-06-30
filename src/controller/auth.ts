import { JsonController,Body,Post} from 'routing-controllers';
import { Service } from 'typedi';
import AuthService  from '@/service/auth'
import { IAuthParams } from '@/interface/auth';

@JsonController()
@Service()
export default class UserController {

  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() authInfo: IAuthParams) {
    const ret = await this.authService.signIn(authInfo)
    return ret
  }

  @Post('/sign-up')
  async signUp(@Body() authInfo: IAuthParams) {
    const token = await this.authService.signUp(authInfo)
    return token
  }
}