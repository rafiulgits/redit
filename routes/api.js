let express = require("express");
let router = express.Router();
let middleware = require("../core/middleware");

let AccountManager = require("../handlers/api/account");
let PostManager = require("../handlers/api/post");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/login", AccountManager.login);
router.post("/signup", AccountManager.signup);

router.post("/post/create", middleware.checkToken, PostManager.createPost);
router.get("/post/all", middleware.checkToken, PostManager.allPost);
router.get("/post/:id", middleware.checkToken, PostManager.singlePost);
router.post(
  "/post/:id/comment/",
  middleware.checkToken,
  PostManager.addCommentOnPost
);

module.exports = router;
