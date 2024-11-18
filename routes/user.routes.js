const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createUser,
  loginUser,
  getUserById,
  deleteUser,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/users", createUser);
router.post("/login", loginUser);
router.use(authMiddleware);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

module.exports = router;
