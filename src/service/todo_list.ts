import TodoList from "../model/todo_list";

export const getTodoList = async () => {
  const todoList = await TodoList.findAll({
    attributes: ["id", "content", "description"],
  });

  return todoList;
};
