import * as Koa from "koa";
import * as Router from "@koa/router";
import * as logger from "koa-logger";
import registerRouter from "./router";

const app = new Koa();
const router = new Router();

registerRouter(router);

app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
