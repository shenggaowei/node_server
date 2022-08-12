import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import * as cors from '@koa/cors'
import ResponseMiddleware from "@/middlewares/responseMiddleware";
import ErrorMiddleware from "@/middlewares/errorMiddleware";
import "reflect-metadata";

useContainer(Container);

const app = createKoaServer({
  controllers: [__dirname + "/controller/*.+(ts|js)"],
  middlewares: [ErrorMiddleware, ResponseMiddleware],
  cors: true,
  defaultErrorHandler: false,
});

app.use(cors({
  origin: (ctx) => {
    return "https://todo.shenggao.tech"
  }
}))

app.listen(7001, () => {
  console.log("项目跑在了7001端口");
});
