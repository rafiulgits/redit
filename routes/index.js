var express = require("express");
var router = express.Router();
var models = require("../core/db");

router.use(express.urlencoded());
router.use(express.json());

router.get('/user/list/', function (req, res, next) {
  let User = models.User;
  try {
    User.find({}, function (err, result) {
      console.log(err);
      res.send(result)
    })
  } catch (error) {
    res.send(error);
  }
});

router.post("/signup/", function (req, res, next) {
  let newUser = {
    "name": req.body.name,
    "email": req.body.email,
    "gender": req.body.gender,
    "password": req.body.password
  }
  let User = models.User;
  try {
    User.insert(newUser, function (err, result) {
      res.send(result)
    })
  } catch (error) {
    res.send(error);
  }
});

router.get("/post/all", function (req, res, next) {
  let Post = models.Post;
  try {
    Post.find({}, function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/post/:id", function (req, res, next) {
  let Post = models.Post;
  try {
    const _id = models.getObjectId(req.params.id);
    Post.findOne({ _id: _id }, function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/post/", function (req, res, next) {
  let Post = models.Post;
  try {
    let formData = req.body;
    res.send(req.body);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
