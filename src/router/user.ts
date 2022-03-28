import * as Router from "@koa/router";
import * as userController from "../controller/user";

export default (router: Router) => {
  router.get("/login", userController.login);
};
