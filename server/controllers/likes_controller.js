const User = require("../models/users");
const Note = require("../models/notes");

module.exports.likeNotes = (req, res) => {
  var userId = req.params.id;
  var noteName = req.params.noteName;
  if (noteName !== undefined) {
    User.findById(userId, async (err, user) => {
      if (err) {
        console.log("Error in finding user in likeNotes: ", err);
        return;
      }
      try {
        var note = await Note.findOne({ file: noteName });
        if (!user.likedNotes.includes(note._id)) {
         await  user.likedNotes.push(note._id);
        }
        if (!note.likedUsers.includes(userId)) {
        await note.likedUsers.push(userId);
        }
        note.save();
        user.save();
        return res.status(200).json({
          message: "Like Successfully",
          likes : user.likedNotes.length,
          views : user.viewedNotes.length,
          success: true,
        });
      } catch (err) {
        console.log("error in finding not in likeNotes: ", err);
      }
    });
  } else {
    return res.status(201).json({
      message: "file name Not Present ",
      success: false,
    });
  }
};

module.exports.DislikeNotes = (req, res) => {
  var userId = req.params.id;
  var noteName = req.params.noteName;

  if (noteName !== undefined) {
    User.findById(userId, async (err, user) => {
      if (err) {
        console.log("Error in finding user in likeNotes: ", err);
        return;
      }
      try {
        var note = await Note.findOne({ file: noteName });
        if (user.likedNotes.includes(note._id)) {
        await  user.likedNotes.remove(note._id);
        }
        if (note.likedUsers.includes(userId)) {
        await  note.likedUsers.remove(userId);
        }
        note.save();
        user.save();
        return res.status(200).json({
          message: "DisLike Successfully",
          likes : user.likedNotes.length,
          views : user.viewedNotes.length,
          success: true,
        });
      } catch (err) {
        console.log("error in finding not in likeNotes: ", err);
      }
    });
  } else {
    return res.status(201).json({
      message: "file name Not Present ",
      success: false,
    });
  }
};

module.exports.numbersOfLikes = (req, res) => {
  var noteName = req.params.noteName;
  if (noteName !== undefined) {
    Note.findOne({ file: noteName }, (err, note) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        likes: note.likedUsers.length,
        views: note.views.length,
        message: "Get all Like Successfully",
        success: true,
      });
    });
  } else {
    return res.status(201).json({
      message: "Get like not find",
      success: false,
    });
  }
};
