import { Context, Next} from 'koa';
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export default class ResponseMiddleware implements KoaMiddlewareInterface  {
    async use(ctx: Context, next: Next): Promise<any> {
        await next()
        ctx.status = 200
        ctx.body = {
            code: 0,
            data: ctx.body,
            message: '',
            extra: {}
        }
      } 
}