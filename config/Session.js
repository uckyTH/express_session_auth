//config/session.js
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const Redis = require("ioredis");

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis successfully!");
});
redisClient.on("error", (error) => {
  console.error("❌ Redis connection error:", error);
});


module.exports = { 
  redisClient,
  session: session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 30 * 60 * 1000 }, // 30 mins
  }),
};
