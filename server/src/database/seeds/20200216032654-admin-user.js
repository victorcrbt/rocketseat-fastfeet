'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        password_hash: bcrypt.hashSync('123456', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),

  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
