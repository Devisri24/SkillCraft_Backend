const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware");
const { getUserDashboard } = require("../controllers/userController");

// ✅ Make sure both verifyToken and getUserDashboard are valid functions
router.get("/dashboard", verifyToken, getUserDashboard);

module.exports = router;
