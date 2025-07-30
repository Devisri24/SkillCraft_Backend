const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
