import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize("test", "test", "test", {
  host: "",
  dialect: "mysql",
  port: 3306,
});

export default async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
