"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.addColumn("Todos", "status", {
      type: INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("Todos", "todoTime", DATE);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Todos", "status");
    await queryInterface.removeColumn("Todos", "todoTime");
  },
};
