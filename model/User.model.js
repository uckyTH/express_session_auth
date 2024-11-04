const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "adm!n"], default: "user" },
  passwordUpdate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordUpdate = Date.now();
  next();
});

UserSchema.methods.comparedPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now });
  next();
});

module.exports = mongoose.model("User", UserSchema);
