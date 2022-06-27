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
}

const User  = sequelize.define<TModel<IUserModel>>(
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
    }
  },
  {
    tableName: "user",
  }
);

export default User;
