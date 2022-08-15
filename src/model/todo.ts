import sequelize from "@/config/db";
import type { TModel } from "@/interface/model.define";
import type { ITodoModel } from "@/interface/todo";
import { DataTypes } from "@sequelize/core";

const Todo = sequelize.define<TModel<ITodoModel>>(
  "todo",
  {
    content: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    tag_ids: {
      type: DataTypes.STRING
    },
    group_id: {
      type: DataTypes.INTEGER.UNSIGNED
    }
  },
  {
    tableName: "todo",
  }
);

export default Todo;
