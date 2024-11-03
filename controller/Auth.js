const User = require("../model/User.model");

exports.sign_upAsync = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed after signup" });
      }
      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
