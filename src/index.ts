import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import "reflect-metadata";
import ResponseMiddleware from "./middlewares/responseMiddleware";
import ErrorMiddleware from "./middlewares/errorMiddleware";

useContainer(Container);

const app = createKoaServer({
  controllers: [__dirname + "/controller/*.ts"],
  middlewares: [ErrorMiddleware, ResponseMiddleware],
  cors: true,
  defaultErrorHandler: false,
});

app.listen(7001, () => {
  console.log("项目跑在了7001端口");
});
