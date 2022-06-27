import sequelize from "../config/db";
import { DataTypes } from "@sequelize/core";

const Todo_List = sequelize.define(
  "todo_list",
  {
    content: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '1'
    }
  },
  {
    tableName: "todo_list",
  }
);

export default Todo_List;
