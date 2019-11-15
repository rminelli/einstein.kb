/*
 * Edit your development settings in .env file to point to your postgres database,
 * using your db username and password.
 * Don't forget to create your database locally!
 */

const { db } = require("./.env");

module.exports = {
  client: "postgresql",
  connection: db,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
