const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const forgetPasswordMailer = require("../mailers/forget_password_mailer");
const env = require("../environment");

module.exports.forgetPassword = (req, res) => {
  res.render("forget_password");
};

module.exports.updatePassword = (req, res) => {
  res.render("update_password");
};

module.exports.forget_password_post = (req, res) => {
  var HOST = env.HOST;
  var email = req.body.email;
  var token = Math.floor(Math.random() * 9000) + 1000;
  var accessToken = email + token;

  console.log(email);
  User.findOneAndUpdate(
    { email: email },
    { accessToken: accessToken },
    function (err, user) {
      if (err) {
        console.log("Error find User in forget Password: ", err);
        return;
      }
      if (!user) {
        console.log("User not Found");
        return res.status(201).json({
          message: "Email Id Not Registered",
          success: false,
        });
      } else {
        user.save();
        var obj = {};
        obj.email = user.email;
        obj.url = `${HOST}/update_password?accessToken=${accessToken}`;
        forgetPasswordMailer.forgetPassword(obj);

        return res.status(200).json({
          message: "Mail Send  Successfully",
          success: true,
        });
      }
    }
  );
};

module.exports.update_password_post = (req, res) => {
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  var accessToken = req.body.accessToken;
  console.log(password, confirm_password, accessToken);

  if (password != confirm_password) {
    console.log("passwords dont match");
    return res.status(201).json({
      message: "Password or Confirm Password Not Match",
      success: false,
    });
   
  } else {
    var email = accessToken.substring(0, accessToken.length - 4);
    console.log(email);

    User.findOne({ email: email }, function (err, user) {
      if (err) {
        console.log("Error in finding user: ", err);
        return;
      }

      if (accessToken == user.accessToken) {
        bcryptjs.genSalt(12, (err, salt) => {
          if (err) throw err;
          // hash the password
          bcryptjs.hash(password, salt, (err, hash) => {
            if (err) throw err;

            User.findOneAndUpdate(
              { email: email },
              { password: hash, accessToken: null },
              function (err, user) {
                if (err) {
                  console.log("Error in finding user: ", err);
                  return;
                }
                user.save();
              }
            );
          });
        });
      }
    });

    return res.status(200).json({
      message: "Update Password  Successfully",
      success: true,
    });
  }
};
