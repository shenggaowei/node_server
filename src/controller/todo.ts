import { JsonController, Body, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import TodoService from "@/service/todo";
import AuthCheckMiddleware from "@/middlewares/authCheckMiddleware";
import type { ITodoCreateParams } from "@/interface/todo";
import { TodoBody } from "@/utils/param_validator/todo";

@JsonController("/todo")
@Service()
export default class UserController {
  constructor(private todoService: TodoService) { }

  @Post("/create")
  @UseBefore(AuthCheckMiddleware)
  async createTodo(@Body({ validate: true }) todoInfo: TodoBody) {
    const params = { ...todoInfo } as unknown as ITodoCreateParams
    const token = await this.todoService.createTodo(params);
    return {
      token,
    };
  }

  // @Post("/get/:id")
  // async getTodoById(@Body() authInfo: IUserParams) {
  // const token = await this.authService.signUp(authInfo);
  // return {
  // token,
  // };
  // }

  // @Post("/delete/:id")
  // async deleteTodoById(@Body() authInfo: IUserParams) {
  // const token = await this.authService.signUp(authInfo);
  // return {
  // token,
  // };
  // }

  // @Post("/update/:id")
  // async updateTodoById(@Body() authInfo: IUserParams) {
  // const token = await this.authService.signUp(authInfo);
  // return {
  // token,
  // };
  // }

}
