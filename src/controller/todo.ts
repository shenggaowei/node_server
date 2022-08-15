import { JsonController, Body, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import TodoService from "@/service/todo";
import AuthCheckMiddleware from "@/middlewares/authCheckMiddleware";
import type { ITodoCreateParams } from "@/interface/todo";

@JsonController("/todo")
@Service()
export default class UserController {
  constructor(private todoService: TodoService) { }

  @Post("/create")
  @UseBefore(AuthCheckMiddleware)
  async createTodo(@Body() todoInfo: ITodoCreateParams) {
    const token = await this.todoService.createTodo(todoInfo);
    return {
      token,
    };
  }

  // @Post("/get/:id")
  // async getTodoById(@Body() authInfo: IAuthParams) {
  // const token = await this.authService.signUp(authInfo);
  // return {
  // token,
  // };
  // }

  // @Post("/delete/:id")
  // async deleteTodoById(@Body() authInfo: IAuthParams) {
  // const token = await this.authService.signUp(authInfo);
  // return {
  // token,
  // };
  // }

  // @Post("/update/:id")
  // async updateTodoById(@Body() authInfo: IAuthParams) {
  // const token = await this.authService.signUp(authInfo);
  // return {
  // token,
  // };
  // }

}
