const bcrypt = require('bcrypt-nodejs')

const encryptPassword = async password => {
  const salt = bcrypt.genSaltSync(10);  
  return await bcrypt.hashSync(password, salt);
};

exports.up = async function(knex, Promise) {
  let _password = await encryptPassword('admin')

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
          password: _password,
          admin: true
        }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
