const passport = require("passport");
const { sign_upAsync } = require("../controller/Auth");

const router = require("express").Router();

router
  .post("/sign-up", sign_upAsync)
  .post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in successfully" });
  });

exports.router = router;
