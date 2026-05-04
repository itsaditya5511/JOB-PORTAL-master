import path from "path";
import fs from "fs";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { RESUME_DIR } from "./multer.js";

const RESUME_DIR_ABS = path.resolve(RESUME_DIR);

export const downloadResume = async (req, res, next) => {
  try {
    const { filename } = req.params;
    if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return res.status(400).json({ message: "Invalid filename", success: false });
    }

    const filePath = path.resolve(RESUME_DIR_ABS, filename);
    if (!filePath.startsWith(RESUME_DIR_ABS + path.sep)) {
      return res.status(400).json({ message: "Invalid path", success: false });
    }
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Resume not found", success: false });
    }

    const resumePath = `/uploads/resumes/${filename}`;
    const owner = await User.findOne({ "profile.resume": resumePath }).select("_id");

    if (!owner) {
      return res.status(404).json({ message: "Resume not found", success: false });
    }

    if (String(owner._id) === String(req.id)) {
      return res.sendFile(filePath);
    }

    const recruiterJobs = await Job.find({ created_by: req.id }).select("_id");
    if (recruiterJobs.length) {
      const jobIds = recruiterJobs.map((j) => j._id);
      const hasApplied = await Application.exists({
        applicant: owner._id,
        job: { $in: jobIds },
      });
      if (hasApplied) return res.sendFile(filePath);
    }

    return res.status(403).json({ message: "Forbidden", success: false });
  } catch (err) {
    next(err);
  }
};
