import * as Koa from "koa";
import * as Router from "@koa/router";
import * as logger from "koa-logger";
import { getUser } from "./service/user";

const app = new Koa();
const router = new Router();

router.get("/hello", (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = "hello worlds";
});

app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx: Koa.Context) => {
  const ret = await getUser();
  ctx.body = ret;
});

app.listen(3000);
