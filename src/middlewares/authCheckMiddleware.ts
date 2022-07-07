import { Context, Next} from 'koa';
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService  from '@/service/auth'
import * as EXCEPTION from '@/config/exception';

@Middleware({ type: 'before' })
@Service()
export default class AuthCheckMiddleware implements KoaMiddlewareInterface {
  constructor(private authService: AuthService){}

  async use(context: Context,  next: Next ): Promise<any> {
    const isLogin = await this.authService.verifyToken('hh')
    if (isLogin) {
      await next()
    } else {
        throw new EXCEPTION.AuthFailed()
    }
  }
}