import { createKoaServer } from 'routing-controllers';
import { UserController } from './controller/userController';
import "reflect-metadata"

const app = createKoaServer({
  controllers: [UserController],
  cors: true
});

app.listen(7001, () => {
  console.log('项目跑在了7001端口')
});