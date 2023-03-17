const User = require("../models/users");
const env = require("../environment");

module.exports.verifyMobile = (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user.name;
    var user_id = req.user.id;
    res.render("verify_mobile", {
       userName : user,
       user_id: user_id
    });
  } else {
    res.render("signin");
  }
};

module.exports.sendOtpMessage = (req, res) => {
  // send the otp message
  const mobilenumber = req.params.mobileNumber;
  console.log(req.params);
  const userEmail = req.user.email;
  console.log("OTP Controller");
  API_KEY = env.API_KEY_MOBILE;

  const fast2sms = require("fast-two-sms");
  const OTP = Math.floor(Math.random() * 9000) + 1000;

  var options = {
    authorization: API_KEY,
    message: `Your SahiNotes Application One Time OTP is  ${OTP}.  Created By Suzel`,
    numbers: [mobilenumber],
  };

  async function sendOtpMessage() {
    var res = true; // await fast2sms.sendMessage(options);
    if (res) {
      // console.log("succes",res);
      User.findOneAndUpdate(
        { email: userEmail },
        { mobileOtp: OTP },
        function (err, user) {
          if (err) {
            console.log("Error in saving otp: ", err);
            return;
          }
          user.save();
          var id = setTimeout(function (OTP) {
            User.findOne({ email: userEmail }, function (err, user) {
              if (err) {
                return;
              }
              if (user.mobileOtp == OTP) {
                User.findOneAndUpdate(
                  { email: userEmail, mobileOtp: "" },
                  function (err, user) {}
                );
              }
            });
          }, 1000);
        }
      );
    } else {
      console.log("balance over");
    }
  }
  sendOtpMessage();
};

module.exports.verifyOtp = (req, res) => {
  var obj = JSON.parse(req.params.obj);
  var mobileNumber = obj.mobileNumber;
  var otp = obj.otp;
  var useEmail = req.user.email;

  if (otp == req.user.mobileOtp) {
    User.findOneAndUpdate(
      { email: useEmail },
      { mobile: mobileNumber, mobileOtp: "" },
      function (err, user) {
        if (err) {
          console.log("Error in verifying otp: ", err);
          return;
        }
        user.save();
      }
    );
    req.flash("success", "Verify Number Successfully");
    console.log("mobile number verified");
    return res.redirect("/users/profile");
  } else {
    User.findOneAndUpdate({ email: useEmail }, function (err, user) {});
    req.flash("error", "OTP Invalid");
    console.log("OTP Invalid");
    return res.redirect("/users/mobile_auth/verify_mobile");
  }
};
