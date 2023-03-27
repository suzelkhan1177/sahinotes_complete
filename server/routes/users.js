const express = require("express");
const passport = require("passport");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile/:user_id", usersController.profile);
router.get("/signin", usersController.signin);
router.get("/signup", usersController.signup);
router.get("/logout", usersController.logout);

router.post("/create", usersController.create);

//called create during signup and then redirected to sign in page
router.post(
  "/create_session",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/users/signin",
    failureFlash: "Login not successful Please check email id and Password",
  }),
  usersController.createSession
);
//called create session during signin and thenr edirected to profile page

//in both signup and signin, we will call createsession and redirect to profile page

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  usersController.createSession
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/signin",
    failureFlash: "Login not successful",
  }),
  usersController.createSession
);

router.get("/check_authentication/:id", usersController.checkAuthentication);
router.delete("/delete_note/:note_file", usersController.deleteNotes);

router.get("/get_all_users/:id", passport.checkAuthentication, usersController.getAllUsers);
router.post("/google_login", usersController.googleLogin);
module.exports = router;
