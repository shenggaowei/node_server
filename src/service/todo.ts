import { Service } from "typedi";
import Todo from "@/model/todo";
import * as EXCEPTION from '@/config/exception'
import authService from '@/service/auth'
import type { ITodoCreateParams } from "@/interface/todo";

@Service()
export default class TodoService {
  constructor(private authService: authService) { }

  async createTodo(todoInfo: ITodoCreateParams) {
    try {
      const { token } = todoInfo;
      const userInfo = await this.authService.getUserInfo(token)
      const ret = await Todo.create({
        content: todoInfo.content,
        description: todoInfo.description,
        end_time: todoInfo.endTime,
        tag_ids: todoInfo.tagIds,
        group_id: todoInfo.groupId,
        user_id: userInfo[0].user_id
      })
      return ret
    } catch (error) {
      throw new EXCEPTION.Exception(error.message)
    }
  }
}


