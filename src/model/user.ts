import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db";

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "user",
  }
);

export default User;
