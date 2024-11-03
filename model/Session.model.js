const { default: mongoose } = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", 
  },
  provider: { type: String, required: true },
  ip: { type: String, required: true },
  osName: { type: String, required: true },
  osVersion: { type: String, required: true }, 
  countryName: { type: String, required: true },
  expire: { type: Date, required: true }, 
});

const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
