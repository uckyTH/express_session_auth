const User = require("../model/User.model");

exports.createUserAsync = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password, role }); // ส่งข้อมูลไปที่โมเดล
    await user.save();
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Login failed after signup", error: err.message });
      }
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(400).json({ message: "No active session to log out." });
    }
    req.logout(function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Logout failed. Please try again." });
      }

      if (req.session) {
        req.session.destroy((destroyErr) => {
          if (destroyErr) {
            return res
              .status(500)
              .json({ error: "Failed to destroy session." });
          }

          res.clearCookie("connect.sid"); // ลบ cookie ของ session
          return res.status(200).json({ message: "Logged out successfully." });
        });
      } else {
        // กรณีไม่มี session อยู่แล้ว
        res.status(200).json({ message: "No active session to log out." });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
