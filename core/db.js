const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

var DB = function () {
  const DB_URL = "mongodb://localhost:27017";
  const DB_NAME = "moc";

  var db = null;

  async function Connect() {
    try {
      let _connection = await MongoClient.connect(DB_URL);
      return _connection.db("moc");
    } catch (err) {
      return err;
    }
  }

  async function Reference() {
    try {
      if (db != null) {
        return db;
      } else {
        db = await Connect();
        return db;
      }
    } catch (err) {
      return err;
    }
  }
  return {
    Reference: Reference
  };
};

function getObjectId(_id) {
  return new ObjectId(_id);
}

class Model {
  constructor(collection) {
    this.collection = collection;
    this.DB = DB();
  }

  async findOne(query, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).findOne(query, listener);
  }

  async find(query, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection)
      .find(query)
      .toArray(listener);
  }

  async insert(obj, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).insert(obj, listener);
  }

  async insertMany(arr, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).insertMany(arr, listener);
  }
}


class User extends Model {
  //
  // name
  // email
  // password
  // gender
  //
  constructor() {
    super("user");
  }
}

class Comment extends Model {
  //
  // body
  // time
  // date
  // user
  //
  constructor() {
    super("comment");
  }
}

class Post extends Model {
  //
  // title
  // description
  // time
  // date
  // user
  // comments[top 10]
  //
  constructor() {
    super("post");
  }
}

module.exports = {
  DB: DB(),
  User: new User(),
  Post: new Post(),
  Comment: new Comment(),
  getObjectId: getObjectId
};
