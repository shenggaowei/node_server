import * as Koa from "koa";
import * as todoListService from "../service/todo_list";

export const getTodoList = async (ctx: Koa.Context, next: Koa.Next) => {
  const ret = await todoListService.getTodoList();
  ctx.body = ret;
};
