import * as Router from "@koa/router";
import * as koaBody from 'koa-body'
import * as userController from "../controller/user";

export default (router: Router) => {
  router.post("/login", koaBody(), userController.login);
  router.post("/register", koaBody(), userController.register);
};
