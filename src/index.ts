import * as Koa from "koa";
import * as Router from "@koa/router";
import * as logger from "koa-logger";
import registerRouter from "./router";

const app = new Koa();
const router = new Router();

registerRouter(router);
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = "html";
    ctx.body = "<p>SomeThing Error</p>";
    ctx.app.emit("error", err, ctx);
  }
});

app.on("error", function (err) {
  if (process.env.NODE_ENV != "test") {
    console.log("sent error %s to the cloud", err.message);
    console.log(err);
  }
});

app.listen(7001);
