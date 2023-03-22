const User = require("../models/users");
const Session = require("../models/session");
const bcryptjs = require("bcryptjs");
const accountCreatedMailer = require("../mailers/account_created_mailer");
const queue = require("../workers/account_created_mailer");
const Note = require("../models/notes");
const Comment = require("../models/comments");
const fs = require("fs");
const env = require("../environment");

module.exports.home = (req, res) => {
  if (req.user) {
    var logged_in_user = req.user._id;
  } else {
    var logged_in_user_id = "";
  }

  if (req.isAuthenticated()) {
    var user = req.user.name;
    res.render("home", {
      userName: user,
      user_id: logged_in_user,
    });
  } else {
    res.render("home", {
      user_id: logged_in_user,
    });
  }
};

module.exports.profile = (req, res) => {
  var logged_in_user = req.user._id;
  var profile_user_id = req.params.user_id;

  if (req.isAuthenticated()) {
    var user = req.user.name;
    res.render("profile", {
      userName: user,
      user_id: logged_in_user,
    });
  } else {
    if (logged_in_user != profile_user_id) {
      return res.render("profile");
    }

    res.render("signin");
  }
};

module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user.name;
    res.render("profile", {
      userName: user,
    });
  } else {
    res.render("signin");
  }
};

module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user.name;
    res.render("profile", {
      userName: user,
    });
  } else {
    res.render("signup");
  }
};

module.exports.create = (req, res) => {
  const email = req.body.email;
  if (email.substring(email.length - 10, email.length) != "@gmail.com") {
    return res.status(201).json({
      message: "Email Id Incorect",
      success: false,
    });
  }

  if (req.body.password != req.body.confirm_password) {
    return res.status(201).json({
      message: "Password or Confirm Password Not Match",
      success: false,
    });
  }
  //search if this is a new user or an old one
  // if new user -> create user -> send to sign in page
  // if old user -> send to sign in page
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in create controller: ", err);
      return res.redirect("back");
    }
    // if condition is true if user==null/undefined which means no prevous entry

    if (!user) {
      bcryptjs.genSalt(12, (err, salt) => {
        if (err) throw err;
        // hash the password
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          User.create(
            {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            },
            (err, user) => {
              if (err) {
                console.log(
                  "Error is Creating user is create controller: ",
                  err
                );
                return res.redirect("back");
              }

              // i should send the email(user.email)
              //  accountCreatedMailer.accountCreated(user);

              //call the worker hare
              queue.create("emails", user).save(function (err) {
                accountCreatedMailer.accountCreated(user);
                if (err) {
                  console.log(err);
                  return;
                }
              });
              return res.status(200).json({
                message: "Account Create Successfully",
                success: true,
              });
            }
          );
        });
      });
    } else {
      return res.status(400).json({
        message: "Email ID already Registered",
        success: false,
      });
    }
  });
};

module.exports.createSession = async (req, res) => {
  var id = req.user._id;
  var name = req.user.name;
  var email = req.user.email;
  var currentDate = new Date();
  var expiryDate = currentDate.setHours(currentDate.getHours() + 24);
  expiryDate = new Date(expiryDate);
  var session = await Session.create({
    user: id,
    expires: expiryDate,
  });
  return res.status(200).json({
    success: true,
    status: "Login Successfully ",
    user: {
      id: id,
      name: name,
      email: email,
    },
  });
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("Error is LogOut", err);
      return;
    }
  });

  return res.status(200).json({
    message: "LogOut Successfully",
    success: true,
  });
};

module.exports.deleteNotes = async (req, res) => {
  const file = req.params.note_file;

  if (file !== undefined) {
    var note = await Note.findOne({ file: file });
    var author = await User.findById(note.user);
    var index = author.notes.indexOf(note._id);
    await author.notes.splice(index, 1);
    await author.save();

    var likedUsers = note.likedUsers;
    var viewedUsers = note.views;

    // delete like  in User Schema
    for (var i = 0; i < likedUsers.length; i++) {
      var u = await User.findById(likedUsers[i]);
      var index = u.likedNotes.indexOf(note._id);
      await u.likedNotes.splice(index, 1);
      await u.save();
    }

    // delete view in User Schema
    for (var i = 0; i < viewedUsers.length; i++) {
      var u = await User.findById(viewedUsers[i]);
      var index = u.viewedNotes.indexOf(note._id);
      await u.viewedNotes.splice(index, 1);
      await u.save();
    }

    var parentComments = note.comments;

    for (var i = 0; i < parentComments.length; i++) {
      // find parent comment id
      var x = await Comment.findById(parentComments[i]);
      var childComments = x.comments;

      //delete child comment User Schema
      for (var j = 0; j < childComments; j++) {
        // find  child comment id
        var y = await Comment.findById(childComments[j]);

        var u = await User.findById(y.user);
        var index = u.comments.indexOf(y._id);
        await u.comments.splice(index, 1);
        await u.save();

        //delete child comment
        await Comment.findByIdAndDelete(y._id);
      }

      var u = await User.findById(x.user);
      var index = u.comments.indexOf(u);
      await u.comments.splice(index, 1);
      await u.save();

      await Comment.findByIdAndDelete(x._id);
    }

    await Note.findByIdAndDelete(note._id);
    fs.unlink(__dirname + `/../assets/uploads/notes/${file}`, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });

    return res.status(200).json({
      message: "Notes Delete Successfully",
      success: true,
    });
  } else {
    return res.status(401).json({
      message: "Server Error in Backend",
      success: false,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  if (req.params.id !== undefined) {
    var users = await User.find();
    var output = [];
    for (let i = 0; i < users.length; i++) {
      output.push({ id: users[i]._id, name: users[i].name });
    }

    return res.status(200).json({
      message: "Get All User Successfully",
      success: true,
      output,
    });
  } else {
    return res.status(400).json({
      message: "User Already LogOut",
      success: false,
    });
  }
};

module.exports.checkAuthentication = async (req, res) => {
  var id = req.params.id;
  var session = await Session.findOne({ user: id });
  var expiryDate = session.expires;
  var currentDate = new Date();

  if (currentDate > expiryDate) {
    res
      .status(201)
      .json({
        message: "session expires",
        success: false,
        id: undefined,
        name: undefined,
      });
  } else {
    var user = await User.findById(id);
    var currentDate = new Date();
    var expiryDate = currentDate.setHours(currentDate.getHours() + 24);
    expiryDate = new Date(expiryDate);
    session.expires = expiryDate;
    await session.save();

    return res.status(200).json({
      message: "User is Already Login",
      success: true,
      user: {
        id: id,
        name: user.name,
        email: user.email,
      },
    });
  }
};
