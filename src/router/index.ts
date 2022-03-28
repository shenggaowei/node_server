import * as Router from "@koa/router";
import configUser from "./user";

export default (router: Router) => {
  configUser(router);
};
