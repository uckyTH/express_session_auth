const passport = require("passport");
const User = require("../model/User.model");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, {
            message: "E-mail or Password incorrect.",
          });
        const isMatch = await user.comparedPassword(password);
        if (!isMatch)
          return done(null, false, { message: "E-mail or Password incorrect" });
        return done(null, { id: user.id });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
