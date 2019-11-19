const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

var DB = function() {
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

  async insertOne(obj, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).insert(obj, listener);
  }

  async insertMany(arr, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).insertMany(arr, listener);
  }

  async updateOne(query, obj, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).updateOne(query, obj, listener);
  }

  async deleteOne(query, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).deleteOne(query, listener);
  }

  async deleteMany(query, listener) {
    let db = await this.DB.Reference();
    db.collection(this.collection).deleteMany(query, listener);
  }
}

class User extends Model {
  //
  // name
  // email
  // password
  //
  constructor() {
    super("user");
  }

  create(data, listener) {
    try {
      this.findOne({ email: data.email }, (err, result) => {
        if (result !== null) {
          listener({ message: "email already registered" });
          return;
        }
        this.insertOne(
          {
            name: data.name,
            email: data.email,
            password: data.password
          },
          listener
        );
      });
    } catch (err) {
      listener(err, null);
    }
  }

  authenticate(data, listener) {
    try {
      this.findOne({ email: data.email, password: data.password }, listener);
    } catch (err) {
      listener(err, null);
    }
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
  // body
  // time
  // date
  // user
  // comments[]
  //
  constructor() {
    super("post");
  }

  create(data, listener) {
    try {
      this.insertOne(
        {
          title: data.title,
          body: data.body,
          time: data.time,
          date: data.date,
          clap: 0,
          user: data.user,
          comments: []
        },
        listener
      );
    } catch (err) {
      listener(err, null);
    }
  }

  addComent(id, data, listener) {
    try {
      let query = {
        _id: new ObjectId(id)
      };
      new Comment().insertOne(
        {
          body: data.body,
          user: data.user,
          time: data.time,
          date: data.date
        },
        (err, result) => {
          if (err) {
            listener(err, null);
            return;
          }
          this.updateOne(
            query,
            {
              $push: { comments: result.ops[0] }
            },
            listener
          );
        }
      );
    } catch (err) {
      listener(err, null);
    }
  }
}

module.exports = {
  DB: DB(),
  User: new User(),
  Post: new Post(),
  Comment: new Comment(),
  getObjectId: getObjectId
};
