import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const LOGO_DIR = "uploads/logos";
const RESUME_DIR = "uploads/resumes";
const PHOTO_DIR = "uploads/photos";
ensureDir(LOGO_DIR);
ensureDir(RESUME_DIR);
ensureDir(PHOTO_DIR);

const makeFilename = (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  return `${Date.now()}-${crypto.randomUUID()}${ext}`;
};

const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, LOGO_DIR),
  filename: (req, file, cb) => cb(null, makeFilename(file)),
});

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, RESUME_DIR),
  filename: (req, file, cb) => cb(null, makeFilename(file)),
});

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PHOTO_DIR),
  filename: (req, file, cb) => cb(null, makeFilename(file)),
});

const imageFilter = (req, file, cb) => {
  const allowedExt = /\.(jpg|jpeg|png|webp)$/i;
  const allowedMime = /^image\/(jpeg|png|webp)$/;
  if (allowedExt.test(file.originalname) && allowedMime.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG, WEBP images allowed"));
};

const resumeFilter = (req, file, cb) => {
  const allowedExt = /\.(pdf|doc|docx)$/i;
  const allowedMime = /^(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;
  if (allowedExt.test(file.originalname) && allowedMime.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only PDF, DOC, DOCX files allowed"));
};

export const logoUpload = multer({
  storage: logoStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("logo");

export const resumeUpload = multer({
  storage: resumeStorage,
  fileFilter: resumeFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("resume");

export const photoUpload = multer({
  storage: photoStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
}).single("photo");

export { LOGO_DIR, RESUME_DIR, PHOTO_DIR };
