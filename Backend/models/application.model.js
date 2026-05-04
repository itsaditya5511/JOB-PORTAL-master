import mongoose from "mongoose";

const APPLICATION_STATUSES = [
  "pending",
  "reviewing",
  "shortlisted",
  "accepted",
  "rejected",
  "hired",
];

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "pending",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
export { APPLICATION_STATUSES };
