import sequelize from "../config/db";

(async function () {
  try {
    await sequelize.sync({ alter: true });
    console.log("数据库同步成功");
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(0);
  }
})();
