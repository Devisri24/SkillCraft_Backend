const User = require("../models/User");

const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getUserDashboard };
