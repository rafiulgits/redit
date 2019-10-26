let Post = require("../core/db").Post;
let Comment = require("../core/db").Comment;

class PostManager {
  singlePost(req, res) {
    try {
      const _id = models.getObjectId(req.params.id);
      Post.findOne({ _id: _id }, (err, result) => {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    } catch (error) {
      res.send(error);
    }
  }

  allPost(req, res) {
    try {
      Post.find({}, (err, result) => {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    } catch (error) {
      res.send(error);
    }
  }

  createPost(req, res) {
    try {
      Post.insertOne({});
    } catch (err) {}
  }

  addCommentOnPost(req, res) {}
}

module.exports = new PostManager();
