const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const port = 3800;
const mongoose = require("mongoose");

require("./config/mongodb");

app.db = db;
app.mongoose = mongoose;

/*
 * Consign makes applications easier to develop with logical
 * file separation and automatic script loading
 */

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./schedule")
  .then("./config/routes.js")
  .into(app);

app.listen(port, () => {
  console.log(` ## Backend running on port: ${port} ## `);
});
