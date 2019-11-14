const path = require("path");

class IndexManager {
  home(req, res) {
    res.sendFile(path.join(__dirname, "/templates/home.html"));
  }

  createPost(req, res) {
    res.sendFile(path.join(__dirname, "/templates/createpost.html"));
  }

  postView(req, res) {
    res.sendFile(path.join(__dirname, "/templates/postitem.html"));
  }
}

module.exports = new IndexManager();
