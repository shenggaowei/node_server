import * as Koa from "koa";
import * as fs from "fs";

const app = new Koa();

app.use(async (ctx) => {
  const ret = fs.readFileSync("./package.json", { encoding: "utf-8" });
  ctx.body = ret;
});

app.listen(3000);
