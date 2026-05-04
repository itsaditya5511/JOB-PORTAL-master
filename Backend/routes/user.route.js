import express from "express";
import { register, login, logout, uploadResume, uploadPhoto } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { resumeUpload, photoUpload } from "../middleware/multer.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema, profileUpdateSchema } from "../validators/schemas.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.post(
  "/upload-resume",
  authenticateToken,
  resumeUpload,
  validate(profileUpdateSchema),
  uploadResume
);

router.post("/upload-photo", authenticateToken, photoUpload, uploadPhoto);

export default router;
