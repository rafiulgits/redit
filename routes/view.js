let express = require("express");
let router = express.Router();

let IndexManager = require("../handlers/views/index");
let AccountManager = require("../handlers/views/account");

router.get("", IndexManager.home);
router.get("/login", AccountManager.login);
router.get("/signup", AccountManager.signup);
router.get("/profile", AccountManager.profile);
router.get("/create-post", IndexManager.createPost);
router.get("/post/:id", IndexManager.postView);

module.exports = router;
