const User = require("../models/users");
const Note = require("../models/notes");
const Comment = require("../models/comments");

module.exports.getComments = (req, res) => {
  //get all the comment for notes
  var id = req.params.id;
  if (id !== undefined) {
    Note.findById(id, async (err, note) => {
      if (err) {
        console.log("fing notes get Comments:", err);
        return;
      }

      var comment_response = {};
      if(note.comments.length === 0){
        return res.status(200).json({
          comments: comment_response,
          message: "fetch All Comment Successfully",
          success: true,
        });
      }

      var parent_comment_ids = note.comments;
      for (var i of parent_comment_ids) {
        var parent_comment = await Comment.findById(i);
        comment_response[i]  = {};
        comment_response[i]["text"] = parent_comment.text;
        comment_response[i]["comment_user_name"] =
          parent_comment.comment_user_name;
        comment_response[i]["user"] = parent_comment.user;
        comment_response[i]["child_comments"] = {};

        //find child comments
        for (var j of parent_comment.comments) {
          var child_comment = await Comment.findById(j);
          var obj = {};
          obj._id = child_comment._id;
          obj.text = child_comment.text;
          obj.comment_user_name = child_comment.comment_user_name;
          obj.user = child_comment.user;
          comment_response[i]["child_comments"][j] = JSON.stringify(obj);
        }
      }

      //  console.log(comment_response);
      return res.status(200).json({
        comments: comment_response,
        message: "fetch All Comment Successfully",
        success: true,
      });
    });
  } else {
    return res.status(201).json({
      message: "Not fetch Comment",
      success: false,
    });
  }
};

module.exports.addNewComments = async (req, res) => {
  // add new comments either a notes/comments
  var file = req.body.file;
  var userId = req.body.id;
  var userName = req.body.name;
  var text = req.body.text;
  var note = await Note.findOne({ file: file });
  var noteId = note._id;
  var type = req.body.type;
  var comment = req.body.comment;

  if (userId !== undefined) {
    var new_comment = await Comment.create({
      text: text,
      comment_user_name: userName,
      note: noteId,
      user: userId,
      type: type,
      comment: comment,
      comments: [],
    });

    User.findById(userId, async function (err, user) {
      if (err) {
        console.log("Error in finding user Addcomments");
        return;
      }
      await user.comments.push(new_comment._id);
      await user.save();
    });

    if (type == "Notes") {
      Note.findById(noteId, async function (err, note) {
        if (err) {
          console.log("Error in finding Note Addcomments");
          return;
        }
        await note.comments.push(new_comment._id);
        await note.save();
      });
    }

    if (type == "Comments") {
      Comment.findById(new_comment.comment, async function (err, comment) {
        if (err) {
          console.log("Error in finding parent comment Addcomments");
          return;
        }
        await comment.comments.push(new_comment._id);
        await comment.save();
      });
    }

    return res.status(200).json({
      message: "Add Comment Successfully",
      success: true,
    });
  } else {
    return res.status(201).json({
      message: "Not add Comment",
      success: false,
    });
  }
};

module.exports.deleteNewComments = async (req, res) => {
  // delete comments either a notes/comments

  var commentId = req.params.fileName;
  var userId = req.params.id;

  if (userId !== undefined) {

  var comment = await Comment.findOne({ _id: commentId });
   var noteId = comment.note;
  var type = comment.type;

  User.findById(userId, async function (err, user) {
    if (err) {
      console.log("Error in finding user Addcomments");
      return;
    }
    await user.comments.remove(commentId);
    await user.save();
  });

  if (type == "Notes") {
    Note.findById(noteId, async function (err, note) {
      if (err) {
        console.log("Error in finding Note Addcomments");
        return;
      }
      await note.comments.remove(commentId);
      await note.save();
    });

    Comment.findById(commentId, async function (err, comment) {
      if (err) {
        console.log("Error in finding Note Addcomments");
        return;
      }

      for (var i = 0; i < comment.comments.length; i++) {
        var y = await Comment.findById(comment.comments[i]);
        var u = await User.findById(y.user);
        var index = u.comments.indexOf(y._id);
        await u.comments.splice(index, 1);
        await u.save();

        //delete child comment
        await Comment.findByIdAndDelete(y._id);
      }
      await Comment.findByIdAndDelete(commentId);
    });
  }

  return res.status(200).json({
    message: "Delete Comment Successfully",
    success: true,
  });
} else {
  return res.status(201).json({
    message: "Not delete Comment",
    success: false,
  });
}

};

module.exports.deleteChildComments = async (req, res) => {
  var userId = req.params.id;
  var commentId = req.params.comment_id;  

  if (userId !== undefined) {

  var child_comment = await Comment.findById(commentId);

  User.findById(userId, async function (err, user) {
    if (err) {
      console.log("Error in finding user Addcomments");
      return;
    }
    await user.comments.remove(commentId);
    await user.save();
  });

  Comment.findById(child_comment.comment, async function (err, comment) {
    if (err) {
      console.log("Error in finding parent comment Addcomments");
      return;
    }
    await comment.comments.remove(commentId);
    await comment.save();
  });

  await Comment.findByIdAndDelete(commentId);

  return res.status(200).json({
    message: "Delete Comment Successfully",
    success: true,
  });
} else {
  return res.status(201).json({
    message: "Not delete Comment",
    success: false,
  });
}


};
