const User = require("../models/users");
const env = require("../environment");
const fast2sms = require("fast-two-sms");

module.exports.verifyMobile = (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user.name;
    var user_id = req.user.id;
    var email = req.user.email;
    res.render("verify_mobile", {
       userName : user,
       user_id: user_id,
       email: email
    });
  } else {
    res.render("signin");
  }
};

module.exports.sendOtpMessage = (req, res) => {
  // send the otp message
  const mobilenumber = req.params.mobileNumber;
  const userEmail = req.params.email;
  API_KEY = env.API_KEY_MOBILE;

  const OTP = Math.floor(Math.random() * 9000) + 1000;

  var options = {
    authorization: API_KEY,
    message: `Your SahiNotes Application One Time OTP is  ${OTP}.  Created By Suzel`,
    numbers: [mobilenumber],
  };

  // async function sendOtpMessage() {
    var response = true; // await fast2sms.sendMessage(options);
    if (response) {
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
      return res.status(200).json({
        message: "OTP Send  Successfully",
        success: true,
      });
    } else {

      console.log("balance over");
      return res.status(201).json({
        message: "balance over",
        success: false,
      });
    }
  // }
  // sendOtpMessage();
};

module.exports.verifyOtp = async (req, res) => {
  var obj = JSON.parse(req.params.obj);
  var mobileNumber = obj.mobileNumber;
  var otp = obj.otp;
  var useEmail = req.params.email;

  
  var user = await User.findOne({ email : useEmail });

  if (otp == user.mobileOtp) {
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
    return res.status(200).json({
      message: "mobile number verified  Successfully",
      success: true,
    });
   
  } else {
    User.findOneAndUpdate({ email: useEmail }, function (err, user) {});

    return res.status(201).json({
      message: "OTP Invalid",
      success: false,
    });
  }
};
