import { createKoaServer } from 'routing-controllers';
import auth from './controller/auth';
import "reflect-metadata"

const app = createKoaServer({
  controllers: [ auth ],
  cors: true
});

app.listen(7001, () => {
  console.log('项目跑在了7001端口')
});