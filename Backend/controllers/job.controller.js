import { Job } from "../models/job.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const postJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
  } = req.body;

  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(",").map((s) => s.trim()).filter(Boolean),
    salary: Number(salary),
    location,
    jobType,
    experienceLevel: experience,
    position,
    company: companyId,
    created_by: req.id,
  });

  return res.status(201).json({
    message: "Job posted successfully.",
    job,
    success: true,
  });
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const keyword = (req.query.keyword || "").trim();
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));

  const query = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const [jobs, total] = await Promise.all([
    Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Job.countDocuments(query),
  ]);

  return res.status(200).json({
    jobs,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    success: true,
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("applications");
  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }
  return res.status(200).json({ job, success: true });
});

export const getAdminJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ created_by: req.id })
    .populate("company")
    .sort({ createdAt: -1 });
  return res.status(200).json({ jobs, success: true });
});
