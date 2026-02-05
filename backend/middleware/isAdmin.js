const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only"
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Admin check failed" });
  }
};

module.exports = isAdmin;
