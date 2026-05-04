import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import requireRole from "../middleware/requireRole.js";
import { validate } from "../middleware/validate.js";
import { applicationStatusSchema, idParamSchema } from "../validators/schemas.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post(
  "/apply/:id",
  authenticateToken,
  requireRole("Student"),
  validate(idParamSchema, "params"),
  applyJob
);

router.get("/get", authenticateToken, requireRole("Student"), getAppliedJobs);

router.get(
  "/:id/applicants",
  authenticateToken,
  requireRole("Recruiter"),
  validate(idParamSchema, "params"),
  getApplicants
);

router.post(
  "/status/:id/update",
  authenticateToken,
  requireRole("Recruiter"),
  validate(idParamSchema, "params"),
  validate(applicationStatusSchema),
  updateStatus
);

export default router;
