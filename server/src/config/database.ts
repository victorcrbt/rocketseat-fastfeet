import('dotenv/config');

const dialect = process.env.DB_DIALECT as 'postgres' | 'sqlite' | 'mysql';

export default {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect,
  storage: './__test__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
