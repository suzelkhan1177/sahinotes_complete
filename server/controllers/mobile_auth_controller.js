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

module.exports.sendotpMessage = async (req, res) => {
  const user_id = req.params.user_id;
  const mobile_number = req.params.mobile_number;
  var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

  API_KEY = env.API_KEY_MOBILE;
  var options = {
    authorization: API_KEY,
    message: `Your SahiNotes Application One Time OTP is  ${otp}.  Created By Suzel`,
    numbers: [mobile_number],
  };
  var output = true;  // await fast2sms.sendMessage(options);
  if (output) {
      User.findById(user_id, async function(err, user) {
          if (err) {console.log('Error in finding user in send otp: ', err); return;}
          user.mobile_otp = otp;
          user.temp_mobile = mobile_number;
          await user.save();
          temp_user = user;
          setTimeout(async function deleteotp() {
              temp_user.mobile_otp = "";
              temp_user.temp_mobile = "";
              await temp_user.save();
          }, 15 * 60 *1000);
      })
      console.log("sent otp successfully");
      return res.status(200).json({
        message: "OTP Send  Successfully",
        success: true,
      });
  } else {
      console.log("Error in sending sms");
      return res.status(201).json({
        message: "balance over",
        success: false,
      });
  }
};

module.exports.verifyotp = async (req, res) => {
  var obj = JSON.parse(req.params.obj);
  var mobile_number = obj.mobile_number;
  var otp = obj.otp;
  var user_id = req.params.user_id;

  User.findById(user_id, async function(err, user) {
      if (err) {console.log('Error in finding user in validateOtp: ', err); return;}
      if (otp==user.mobile_otp) {
          user.mobile = user.temp_mobile;
          user.mobile_otp = "";
          user.temp_mobile = "";
          await user.save();

          return res.status(200).json({
            message: "mobile number verified  Successfully",
            success: true,
          });

      } else {
        return res.status(201).json({
          message: "otp Invalid",
          success: false,
        });

      }
  }); 
};
