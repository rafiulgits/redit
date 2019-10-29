const path = require("path");

class AccountManager {
  login(req, res) {
    res.sendFile(path.join(__dirname, "/templates/signin.html"));
  }
}

module.exports = new AccountManager();
