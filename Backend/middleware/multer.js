import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

// Image filter (for logos)
const imageFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG, WEBP images allowed"));
};

// Resume filter (PDF, DOC, DOCX)
const resumeFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only PDF, DOC, DOCX files allowed"));
};

// Logo upload (2MB)
export const logoUpload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("logo");

// Resume upload (5MB)
export const resumeUpload = multer({
  storage,
  fileFilter: resumeFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("resume");
