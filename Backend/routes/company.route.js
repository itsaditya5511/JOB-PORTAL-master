import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";

import {
  getAllCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

import { logoUpload } from "../middleware/multer.js"; // 👈 use logoUpload, not resumeUpload

const router = express.Router();

router.post("/register", authenticateToken, registerCompany);

router.get("/get", authenticateToken, getAllCompanies);

router.get("/get/:id", authenticateToken, getCompanyById);

// Update company + upload logo
router.put("/update/:id", authenticateToken, logoUpload, updateCompany);

export default router;
