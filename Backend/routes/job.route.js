import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import requireRole from "../middleware/requireRole.js";
import { validate } from "../middleware/validate.js";
import { postJobSchema, idParamSchema } from "../validators/schemas.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", authenticateToken, requireRole("Recruiter"), validate(postJobSchema), postJob);
router.get("/get", getAllJobs);
router.get("/getadminjobs", authenticateToken, requireRole("Recruiter"), getAdminJobs);
router.get("/get/:id", validate(idParamSchema, "params"), getJobById);

export default router;
