import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import requireRole from "../middleware/requireRole.js";
import { validate } from "../middleware/validate.js";
import { logoUpload } from "../middleware/multer.js";
import {
  registerCompanySchema,
  updateCompanySchema,
  idParamSchema,
} from "../validators/schemas.js";
import {
  getAllCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post(
  "/register",
  authenticateToken,
  requireRole("Recruiter"),
  validate(registerCompanySchema),
  registerCompany
);

router.get("/get", authenticateToken, requireRole("Recruiter"), getAllCompanies);

router.get(
  "/get/:id",
  authenticateToken,
  validate(idParamSchema, "params"),
  getCompanyById
);

router.put(
  "/update/:id",
  authenticateToken,
  requireRole("Recruiter"),
  logoUpload,
  validate(idParamSchema, "params"),
  validate(updateCompanySchema),
  updateCompany
);

export default router;
