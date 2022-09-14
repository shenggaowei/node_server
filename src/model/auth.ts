import {
  DataTypes,
  CreationOptional,
} from "@sequelize/core";
import sequelize from "@/config/db";
import type { TModel } from '@/interface/model.define'
import TodoModel from '@/model/todo'

interface IAuthModel {
  id: CreationOptional<number>;
  name: string;
  salt: string;
  hash: string
}

export type TAuth = TModel<IAuthModel>

const Auth = sequelize.define<TAuth>(
  "user",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING
    },
    hash: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "user",
  }
);

Auth.hasOne(TodoModel, {
  foreignKey: {
    name: 'user_id'
  },
  constraints: false
})

export default Auth;