const path = require("path");

class StaticManager {
  react(req, res) {
    console.log("Hello World");
    const file_name = req.params.file_name
    res.sendFile(path.join(__dirname, `react/${file_name}`));
  }
}

module.exports = new StaticManager();
