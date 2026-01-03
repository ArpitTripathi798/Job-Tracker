import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addJob, getJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addJob);
router.get("/", authMiddleware, getJobs);

export default router;

