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
app.get("/all-sessions", async (req, res) => {
  try {
    const sessions = await redisClient.keys("sess:*");
    const allSessionData = await Promise.all(
      sessions.map(async (sessionKey) => {
        const sessionData = await redisClient.get(sessionKey);
        return { key: sessionKey, data: JSON.parse(sessionData) };
      })
    );
    res.json(allSessionData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = app;
