exports.protectRoute = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next(); 
    }
    res
      .status(401)
      .json({
        loggedIn: false,
        message: "Unauthorized access. Please log in.",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while checking authentication status.",
      });
  }
};
