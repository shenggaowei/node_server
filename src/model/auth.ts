import {
  DataTypes,
  CreationOptional,
} from "@sequelize/core";
import sequelize from "@/config/db";
import type { TModel } from '@/interface/model.define'

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

export default Auth;