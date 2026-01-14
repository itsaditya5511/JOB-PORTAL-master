import express from "express";
import { register, login, logout, uploadResume } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { resumeUpload } from "../middleware/multer.js";

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Logout user
router.post("/logout", logout);

// Upload Resume
router.post(
  "/upload-resume",
  authenticateToken,
  resumeUpload,
  uploadResume
);

export default router;
