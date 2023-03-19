const express = require("express");
const router = express.Router();

const mobileAuthsController = require("../controllers/mobile_auth_controller");



router.get("/verify_mobile", mobileAuthsController.verifyMobile);

router.get('/send_otp_message/:user_id/:mobile_number', mobileAuthsController.sendotpMessage);
router.get('/verify_otp/:user_id/:obj', mobileAuthsController.verifyotp);


module.exports = router;
