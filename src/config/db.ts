import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize("test", "root", "shenggao", {
  host: "8.131.101.166",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 20,
    min: 1,
    acquire: 60000,
    idle: 10000,
  },
});

export default sequelize;
