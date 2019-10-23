let jwt = require("jsonwebtoken");
const config = require("./config");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.send({
            authication: "failed",
            message: "invalid token"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.send({
        message: "invalid auth token"
      });
    }
  } else {
    return res.send({
      message: "authentication required"
    });
  }
};

let generateAuthToken = username => {
  let token = jwt.sign({ username: username }, config.SECRET_KEY, {
    expiresIn: "24h"
  });
  return token;
};

module.exports = {
  checkToken: checkToken,
  generateAuthToken: generateAuthToken
};
