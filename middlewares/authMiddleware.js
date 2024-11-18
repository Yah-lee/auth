const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const userId = req.headers["user_id"];

  if (!userId) {
    return res.status(400).json({ error: "You do not have permission" });
  }

  try {
    const decoded = jwt.verify(userId, "Secret@");
    req.user_id = decoded.username;
  } catch (err) {
    return res.status(400).json({ error: "You do not have permission" });
  }

  next();
};

module.exports = authMiddleware;
