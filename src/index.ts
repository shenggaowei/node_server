import * as Koa from "koa";
import * as Router from "@koa/router";
import * as logger from "koa-logger";
import * as fs from "fs";
import connect from "./config/db";

const app = new Koa();
const router = new Router();

router.get("/hello", (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = "hello worlds";
});

app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx: Koa.Context) => {
  const ret = fs.readFileSync("./package.json", { encoding: "utf-8" });
  ctx.body = ret;
});

connect();

app.listen(3000);
