const bcrypt = require('bcrypt-nodejs')
const salt = bcrypt.genSaltSync(10);
const encryptPassword = bcrypt.hashSync('admin', salt);

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
      table.increments("id").primary();
      table.string("name").notNull();
      table.string("email").notNull().unique();
      table.string("password").notNull();
      table.boolean("admin").notNull().defaultTo(false);
      table.timestamp("deletedAt");
    })
    .then(function() {
      return knex("users").insert([
        {
          name: "admin",
          email: "admin@einstein.kb",
          password: encryptPassword,
          admin: true
        }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
