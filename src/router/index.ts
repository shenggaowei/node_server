import * as Router from "@koa/router";
import configUser from "./user";
import configTodoList from "./todo_list";

export default (router: Router) => {
  configUser(router);
  configTodoList(router);
};
