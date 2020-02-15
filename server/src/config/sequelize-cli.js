require('dotenv/config');

module.exports = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  storage: './__test__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
