import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const applyJob = asyncHandler(async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }

  const existing = await Application.findOne({ job: jobId, applicant: userId });
  if (existing) {
    return res.status(400).json({
      message: "You have already applied for this job",
      success: false,
    });
  }

  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  await Job.updateOne(
    { _id: jobId },
    { $addToSet: { applications: newApplication._id } }
  );

  return res.status(201).json({
    message: "Application submitted successfully",
    success: true,
  });
});

export const getAppliedJobs = asyncHandler(async (req, res) => {
  const application = await Application.find({ applicant: req.id })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      populate: { path: "company" },
    });

  return res.status(200).json({ application, success: true });
});

export const getApplicants = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
      select: "-password",
    },
  });

  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }

  if (String(job.created_by) !== String(req.id)) {
    return res.status(403).json({ message: "Forbidden", success: false });
  }

  return res.status(200).json({ job, success: true });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate("job");

  if (!application) {
    return res.status(404).json({ message: "Application not found", success: false });
  }

  if (String(application.job.created_by) !== String(req.id)) {
    return res.status(403).json({ message: "Forbidden", success: false });
  }

  application.status = status.toLowerCase();
  await application.save();

  return res.status(200).json({
    message: "Application status updated",
    success: true,
  });
});
