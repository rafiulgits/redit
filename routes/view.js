let express = require("express");
let router = express.Router();

let IndexManager = require("../handlers/views/index");

router.get("/", IndexManager.home);

module.exports = router;
