'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('deliverymen', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    }),

  down: queryInterface =>
    queryInterface.removeConstraint('deliverymen', 'deliverymen_email_key'),
};
