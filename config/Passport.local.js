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
        return done(null, {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
