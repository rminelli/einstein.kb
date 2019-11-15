const bcrypt = require("bcrypt-nodejs");

module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  const save = async (req, res) => {
    const user = { ...req.body }; // Spread operator for get body data
    if (req.params.id) user.id = req.params.id;

    if (!req.originalUrl.startsWith("/users")) user.admin = false;
    if (!req.user || !req.user.admin) user.admin = false;

    try {
      existsOrError(user.name, "Name not entered");
      existsOrError(user.email, "Email not entered");
      existsOrError(user.password, "Password invalid");
      existsOrError(user.confirmPassword, "Confirm password invalid");
      equalsOrError(user.password, user.confirmPassword, "Password not match");

      const userFromDb = await app
        .db("users") // Knex DB
        .where({ email: user.email })
        .first();
      if (!user.id) {
        notExistsOrError(userFromDb, "User is already registered");
      }
    } catch (msg) {
      return res.status(400).send(msg); // Client error
    }
    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      user.deletedAt = null;
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin", "deletedAt")
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err));
      
  };

  const getById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .whereNull("deletedAt")
      .where({ id: req.params.id })
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    // Soft delete
    try {
      const articles = await app.db("articles").where({ id: req.params.id });

      notExistsOrError(articles, "Usuários possui artigos!");

      const rowsUpdated = await app
        .db("users")
        .update({ deletedAt: new Date() })
        .where({ id: req.params.id });

      existsOrError(rowsUpdated, "Usuário não encontrado");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
};
