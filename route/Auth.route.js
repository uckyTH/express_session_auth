const passport = require("passport");
const {
  createUserAsync,
  checkAuth,
  logoutUser,
} = require("../controller/Auth");
const { protectRoute } = require("../middleware/common");

const router = require("express").Router();

router
  .post("/sign-up", createUserAsync)
  .post("/login", passport.authenticate("local"), (req, res) => {
    
    res.json({ message: "Logged in successfully", user: req.user });
  })
  .post("/logout", logoutUser)
  .get("/check-auth", protectRoute, checkAuth);

exports.router = router;
