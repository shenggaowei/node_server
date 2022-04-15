import * as Router from "@koa/router";
import * as todoListController from "../controller/todo_list";

export default (router: Router) => {
  router.get("/todo_list", todoListController.getTodoList);
};
