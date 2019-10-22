var jwt = require("jsonwebtoken");
var getObjectId = require("./db").getObjectId

const PRIVATE_KEY = "a04e816a36134bd582091f85e1566bb1";

class JWTAuth {
  authenticate(req) {

  }

  getToken(user) {
    jwt.sign(
      { "_id": user }
    )
  }
}