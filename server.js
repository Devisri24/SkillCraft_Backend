import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import adminCareerRoutes from "./routes/adminCareerRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js"; // ✅ Fixed here
dotenv.config(); // Load .env

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://skill-craft-frontend-phi.vercel.app'],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Mount Routes
app.use("/auth", authRoutes);
app.use("/admin-career", adminCareerRoutes);
app.use("/protected", protectedRoutes); // ✅ Correctly imported
// Start Server

app.get("/", (req, res) => {
  res.send("✅ SkillCraft backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
