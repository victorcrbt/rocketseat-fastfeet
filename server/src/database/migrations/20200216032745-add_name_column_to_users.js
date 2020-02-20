'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'name'),
};
