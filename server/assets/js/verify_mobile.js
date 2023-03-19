var sendOtpButton = document.getElementById("sendOtpButton");
var mobileNumber = document.getElementById("mobileNumber");
var user_id = document.getElementById("user_id").innerHTML;

sendOtpButton.addEventListener("click", function (e) {
  new Noty({
    theme: "relax",
    type: "success",
    text: "Send OTP Your Number Successfully!!",
    layout: "topCenter",
    timeout: 3000,
  }).show();

  //call a GET API
  e.preventDefault();
  fetch(`/users/mobile_auth/send_otp_message/${user_id}/${mobileNumber.value}`);
  console.log("otp sent");
});

var verify = document.getElementById("verify");
var otp = document.getElementById("otp");
verify.addEventListener("click", function (e) {
  e.preventDefault();
  var obj = {};
  obj.otp = otp.value;
  obj.mobileNumber = mobileNumber.value;

  //   convert object to text so that you can send it in a url
  fetch(`/users/mobile_auth/verify_otp/${user_id}/${JSON.stringify(obj)}`);
  window.location = "/users/mobile_auth/verify_mobile";
});
