const path = require("path");

class IndexManager {
  home(req, res) {
    res.sendFile(path.join(__dirname, "/templates/home.html"));
  }
}

module.exports = new IndexManager();
