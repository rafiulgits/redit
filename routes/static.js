let express = require("express");
let router = express.Router();

let StaticManager = require("../handlers/static/route");

router.get("/react/:file_name", StaticManager.react);
router.get("/lib/:file_name", StaticManager.lib);

module.exports = router;
