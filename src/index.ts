import { createKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi'
import "reflect-metadata"

useContainer(Container)

const app = createKoaServer({
  controllers: [ __dirname + '/controller/*.ts' ],
  middlewares: [ __dirname + '/middlewares/*.ts' ],
  cors: true,
  defaultErrorHandler: false
});

app.listen(7001, () => {
  console.log('项目跑在了7001端口')
});