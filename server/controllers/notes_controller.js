const User = require("../models/users");
const Note = require("../models/notes");
const fs = require("fs");

module.exports.uploadNotesPage = (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user.name;
    var user_id = req.user.id;

    res.render("upload_notes", {
      userName: user,
      user_id: user_id,
    });
  } else {
    res.render("signin");
  }
};

module.exports.showAllNotes = (req, res) => {
  var id = req.params.profile_id;

  if (id === "undefined") {
    return res.status(201).json({
      message: "Notes Not Access Beacuse User Logout",
      success: false,
    });
  }

  User.findById(id, async (err, user) => {
    if (err) {
      console.log("Error is finding user in show_notes :", err);
      return;
    }
    var notesids = user.notes;
    var result = [];
    for (var i = 0; i < notesids.length; i++) {
      //    Note.findById(notesids[i], (err, notes) => {
      //       result.push(notes);
      //  });

      try {
        var note = await Note.findById(notesids[i]);
        result.push(note);
      } catch (err) {
        console.log("Error in finding notes :", err);
      }
    }
    return res.status(200).json(result);
  });
};

module.exports.showSingleNotes = async (req, res) => {
  if (req.params.user_id !== undefined) {
    //  var userId = req.params.user_id;
    //   var user = await User.findById(userId);
    var file = req.params.x;
    var data = fs.readFileSync(__dirname + "/../assets/uploads/notes/" + file);
    console.log(data);
    //   var note = await Note.findOne({ file: file });
    //   var id = note._id;
    //   var note_user =  await User.findById(note.user);
    //   var note_user_name = note_user.name;
    //   if (!user.viewedNotes.includes(note._id)) {
    //     user.viewedNotes.push(note._id);
    //     note.views.push(userId);
    //     note.save();
    //     user.save();
    //   }

    return res.status(200).json({
      status: "Show Note Successfully ",
      success: true,
      contentType: "application/pdf",
      send: data,
      // id: id,
      // file: file,
      // note_user : note.user,
      // name: note_user_name
    });
  } else {
    return res.status(201).json({
      message: "Show Note Failed Beacuse User Not Login",
      success: false,
    });
  }
};

module.exports.uploadNotes = (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var about = req.body.about;

  if (req.files) {
    var filename = req.files.notes.name;
    var dotindex = filename.indexOf(".");

    filename =
      filename.substring(0, dotindex) +
      Date.now() +
      filename.substring(dotindex, filename.length);

    req.files.notes.mv(
      __dirname + "/../assets/uploads/notes/" + filename,
      function (err) {
        if (err) {
          console.log("Error in moving file in folder: ", err);
          return res.send(err);
        }
        Note.create(
          {
            name: name,
            about: about,
            file: filename,
            user: id,
          },
          function (err, note) {
            if (err) {
              console.log("Error in saving note in DB: ", err);
              return res.send(err);
            }
            User.findById(id, function (err, user) {
              if (err) {
                console.log("Error in finding user in upload notes: ", err);
                return res.send(err);
              }
              user.notes.push(note.id);
              user.save();
            });
          }
        );
      }
    );
  } else {
    return res.status(201).json({
      message: "File Not Upload Something Wrong",
      success: false,
    });
  }

  return res.status(200).json({
    message: "File Uploded Successfully",
    success: true,
  });
};
