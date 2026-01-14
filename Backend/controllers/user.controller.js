import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, adharcard, pancard, role } =
      req.body;

    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !password ||
      !role ||
      !pancard ||
      !adharcard
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists", success: false });
    }

    if (await User.findOne({ phoneNumber })) {
      return res.status(400).json({ message: "Phone number already exists", success: false });
    }

    if (await User.findOne({ adharcard })) {
      return res.status(400).json({ message: "Aadhaar already exists", success: false });
    }

    if (await User.findOne({ pancard })) {
      return res.status(400).json({ message: "PAN already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      adharcard,
      pancard,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Registration successful",
      success: true,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
    });
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully",
    success: true,
  });
};

// ================= UPLOAD RESUME =================
export const uploadResume = async (req, res) => {
  try {
    const { bio, skills } = req.body;

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.profile = user.profile || {};

    // ✅ Update bio
    if (bio) user.profile.bio = bio;

    // ✅ Update skills (convert JSON string to array)
    if (skills) user.profile.skills = JSON.parse(skills);

    // ✅ Update resume
    if (req.file) {
      user.profile.resume = `/uploads/${req.file.filename}`;
      user.profile.resumeOriginalname = req.file.originalname;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

