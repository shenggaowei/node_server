import sequelize from "../config/db";
import { DataTypes } from "@sequelize/core";

const TodoItem = sequelize.define(
  "todo_list",
  {
    content: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "todo_list",
  }
);

export default TodoItem;
