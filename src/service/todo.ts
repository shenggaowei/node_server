import { Service } from "typedi";
import todoModel from "@/models/todo.model";
import userService from '@/service/user'
import * as EXCEPTION from '@/config/exception'
import type { ITodoCreateParams } from "@/interface/todo";

@Service()
export default class TodoService {
  constructor(private userService: userService) { }

  async createTodo(todoInfo: ITodoCreateParams) {
    try {
      const { token, content } = todoInfo;
      const userInfo = await this.userService.getUserInfo(token)
      const ret = await todoModel.create({
        content,
        userId: userInfo[0].id
      })
      return ret
    } catch (error) {
      throw new EXCEPTION.Exception(error.message)
    }
  }
}


