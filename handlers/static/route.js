const path = require("path");

class StaticManager {
  react(req, res) {
    const file_name = req.params.file_name;
    res.sendFile(path.join(__dirname, `react/${file_name}`));
  }

  lib(req, res) {
    const file_name = req.params.file_name;
    res.sendFile(path.join(__dirname, `lib/${file_name}`));
  }
}

module.exports = new StaticManager();
