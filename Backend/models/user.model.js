import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    pancard: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    adharcard: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["Student", "Recruiter"],
      default: "Student",
      required: true,
    },

    profile: {
      bio: {
        type: String,
        default: "",
      },

      skills: [
        {
          type: String,
        },
      ],

      resume: {
        type: String, // URL of resume file (optional for future)
        default: "",
      },

      resumeOriginalname: {
        type: String,
        default: "",
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

      profilePhoto: {
        type: String, // Optional
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
