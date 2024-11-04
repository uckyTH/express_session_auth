const express = require("express");
const { session, redisClient } = require("./config/Session");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
const authRouter = require("./route/Auth.route");
require("./config/Passport.local");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter.router);


module.exports = app;
