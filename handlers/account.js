let generateAuthToken = require("../core/middleware").generateAuthToken;
let User = require("../core/db").User;

class AccountManager {
  signup(req, res) {
    User.create(req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      let token = generateAuthToken(req.body.email);
      res.send({
        token: token
      });
    });
  }

  login(req, res) {
    User.authenticate(req.body, (err, result) => {
      if (err || !result) {
        res.status(400).send({ message: "authentication failed" });
        return;
      }
      let token = generateAuthToken(result.email);
      res.send({
        token: token
      });
    });
  }
}

module.exports = new AccountManager();
