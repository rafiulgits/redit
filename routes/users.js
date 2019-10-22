var express = require('express');
var router = express.Router();
var User = require("../core/db").User;

router.use(express.urlencoded());
router.use(express.json());

// router.post("/signup/", function (req, res, next) {
//   return res.send("Hello World");
//   let newUser = {
//     name: req.body.name,
//     email: req.body.email,
//     gender: req.body.gender,
//     password: req.body.password
//   }
//   User.insert(newUser, function (err, result) {
//     if (err) {
//       return res.send(err);
//     }
//     return res.send(result);
//   })
// });



/* GET users listing. */


module.exports = router;
