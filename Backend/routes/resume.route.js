import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import { downloadResume } from "../middleware/protectResume.js";

const router = express.Router();

router.get("/:filename", authenticateToken, downloadResume);

export default router;
