import {
  DataTypes,
  CreationOptional,
} from "@sequelize/core";
import sequelize from "../config/db";
import type { TModel } from '../interface/model.define'

interface IUserModel {
  id: CreationOptional<number>;
  name: string;
  salt: string;
  hash: string
}

export type TUser = TModel<IUserModel>

const User  = sequelize.define<TUser>(
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

export default User;