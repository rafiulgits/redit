const path = require("path");

class AccountManager {
  login(req, res) {
    res.sendFile(path.join(__dirname, "/templates/login.html"));
  }

  signup(req, res) {
    res.sendFile(path.join(__dirname, "/templates/signup.html"));
  }
}

module.exports = new AccountManager();
