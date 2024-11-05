const User = require("../model/User.model");

exports.fetchUserOwn = async (req, res) => {
  try {
    if (!req.user)
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in." });
    const info = await User.findById(req.user.id).select("-password");
    if (!info) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user: info });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
