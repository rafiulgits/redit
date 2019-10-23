let models = require("../core/db");

class PostManager {
  singlePost(req, res) {
    let Post = models.Post;
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
    let Post = models.Post;
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
}

module.exports = new PostManager();
