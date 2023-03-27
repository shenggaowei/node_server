import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { Context } from "koa";
import cors from "kcors";
import ResponseMiddleware from "@/middlewares/responseMiddleware";
import ErrorMiddleware from "@/middlewares/errorMiddleware";
import { allowHost, defaultHost } from "@/config/origin";
import { createRedis } from "@/utils/redis";
import "reflect-metadata";

useContainer(Container);

const app = createKoaServer({
  controllers: [__dirname + "/controller/*.+(ts|js)"],
  middlewares: [ErrorMiddleware, ResponseMiddleware],
  defaultErrorHandler: false,
  cors: true,
});

app.use(
  cors({
    origin: (ctx: Context) => {
      const isAllow = allowHost.includes(ctx.header.origin);
      return isAllow ? ctx.header.origin : defaultHost;
    },
  })
);

app.listen(7001, "0.0.0.0", () => {
  createRedis();
  console.log("项目跑在了7001端口");
});
