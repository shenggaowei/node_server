import { Service } from "typedi";
import Todo from "@/model/todo";
import * as EXCEPTION from '@/config/exception'
import type { ITodoCreateParams } from "@/interface/todo";

@Service()
export default class TodoService {
  async createTodo(todoInfo: ITodoCreateParams) {
    try {
      const ret = await Todo.create({
        content: todoInfo.content,
        description: todoInfo.description,
        end_time: todoInfo.endTime,
        tag_ids: todoInfo.tagIds,
        group_id: todoInfo.groupId
      })
      return ret
    } catch (error) {
      throw new EXCEPTION.Exception(error.message)
    }
  }
}

