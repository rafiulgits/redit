let generateAuthToken = require("../core/middleware").generateAuthToken;

class AccountManager {
  signup(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let token = generateAuthToken(username);
    res.send({
      token: token
    });
  }

  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let token = generateAuthToken(username);

    res.send({
      token: token
    });
  }
}

module.exports = new AccountManager();
