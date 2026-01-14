import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// ================= APPLY JOB =================
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: Please login first",
        success: false,
      });
    }

    if (!jobId) {
      return res.status(400).json({
        message: "Invalid job id",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error("APPLY JOB ERROR:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ================= GET APPLIED JOBS =================
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: Please login first",
        success: false,
      });
    }

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.error("GET APPLIED JOBS ERROR:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ================= GET APPLICANTS =================
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("GET APPLICANTS ERROR:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ================= UPDATE APPLICATION STATUS =================
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated",
      success: true,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
