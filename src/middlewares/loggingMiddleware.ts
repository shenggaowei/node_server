import { Context, Next } from 'koa';
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Middleware({ type: 'before' })
@Service()
export default class LoggingMiddleware implements KoaMiddlewareInterface {
  async use(context: Context, next: Next): Promise<any> {
    return next()
  }
}