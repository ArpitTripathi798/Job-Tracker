import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";

dotenv.config(); // ✅ MUST be at top

const app = express();

/* ===================== CORS CONFIG ===================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-tracker-two-ivory.vercel.app",
  "https://job-tracker-frontend-green.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
/* ======================================================= */

app.use(express.json());

/* ===================== ROUTES ===================== */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
/* ================================================ */

/* DB  */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});