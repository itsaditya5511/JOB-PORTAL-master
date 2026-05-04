import { Company } from "../models/company.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const registerCompany = asyncHandler(async (req, res) => {
  const { companyName } = req.body;

  const existing = await Company.findOne({ name: companyName });
  if (existing) {
    return res.status(409).json({
      message: "Company already exists",
      success: false,
    });
  }

  const company = await Company.create({
    name: companyName,
    userId: req.id,
  });

  return res.status(201).json({
    message: "Company registered successfully",
    company,
    success: true,
  });
});

export const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({ userId: req.id }).sort({ createdAt: -1 });
  return res.status(200).json({ companies, success: true });
});

export const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(404).json({ message: "Company not found", success: false });
  }
  return res.status(200).json({ company, success: true });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;

  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(404).json({ message: "Company not found", success: false });
  }

  if (String(company.userId) !== String(req.id)) {
    return res.status(403).json({ message: "Forbidden", success: false });
  }

  if (name !== undefined) company.name = name;
  if (description !== undefined) company.description = description;
  if (website !== undefined) company.website = website;
  if (location !== undefined) company.location = location;
  if (req.file) company.logo = `/uploads/logos/${req.file.filename}`;

  await company.save();

  return res.status(200).json({
    message: "Company updated successfully",
    company,
    success: true,
  });
});
