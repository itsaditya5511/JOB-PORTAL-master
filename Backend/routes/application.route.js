import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job (should be POST, not GET)
router.post("/apply/:id", authenticateToken, applyJob);

// Get all applied jobs of logged-in user
router.get("/get", authenticateToken, getAppliedJobs);

// Get all applicants for a specific job
router.get("/:id/applicants", authenticateToken, getApplicants);

// Update application status (POST or PUT both ok)
router.post("/status/:id/update", authenticateToken, updateStatus);

export default router;
