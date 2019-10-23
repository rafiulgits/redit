let express = require("express");
let router = express.Router();
let middleware = require("../core/middleware");

let AccountManager = require("../handlers/account");
let PostManager = require("../handlers/post");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/login", AccountManager.login);
router.post("/signup", AccountManager.signup);

router.get("/post/all", middleware.checkToken, PostManager.allPost);
router.get("/post/:id", middleware.checkToken, PostManager.singlePost);

module.exports = router;
