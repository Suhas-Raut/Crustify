const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  console.log("🔐 TOKEN RECEIVED:", token);

  if (!token) {
    return res.status(401).json({ error: "Invalid Auth Token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    console.error("❌ JWT ERROR:", err.message);
    res.status(401).json({ error: "Invalid Auth Token" });
  }
};
