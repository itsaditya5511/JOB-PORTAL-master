import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const isProd = () => process.env.NODE_ENV === "production";

const cookieOptions = () => ({
  httpOnly: true,
  sameSite: isProd() ? "None" : "Strict",
  secure: isProd(),
  maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days so sessions don't expire too quickly
});

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
};

export const register = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  return res.status(201).json({
    message: "Registration successful",
    success: true,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials", success: false });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials", success: false });
  }

  if (user.role !== role) {
    return res.status(403).json({ message: "Role mismatch", success: false });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Server misconfigured", success: false });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, cookieOptions())
    .json({
      message: `Welcome back ${user.fullname}`,
      user: sanitizeUser(user),
      success: true,
    });
});

export const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { ...cookieOptions(), maxAge: 0 })
    .json({ message: "Logged out successfully", success: true });
});

export const uploadResume = asyncHandler(async (req, res) => {
  const { bio, skills } = req.body;

  const user = await User.findById(req.id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  user.profile = user.profile || {};
  if (bio !== undefined) user.profile.bio = bio;

  if (skills) {
    try {
      const parsed = typeof skills === "string" ? JSON.parse(skills) : skills;
      if (Array.isArray(parsed)) user.profile.skills = parsed.map(String);
    } catch {
      user.profile.skills = String(skills)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  if (req.file) {
    user.profile.resume = `/uploads/resumes/${req.file.filename}`;
    user.profile.resumeOriginalname = req.file.originalname;
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: sanitizeUser(user),
  });
});

export const uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No photo file provided", success: false });
  }

  const user = await User.findById(req.id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  user.profile = user.profile || {};
  user.profile.profilePhoto = `/uploads/photos/${req.file.filename}`;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Photo uploaded successfully",
    user: sanitizeUser(user),
  });
});
