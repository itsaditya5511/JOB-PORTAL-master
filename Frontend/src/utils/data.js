const RAW_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5011";
export const BACKEND_URL = RAW_BASE.replace(/\/$/, "");

export const USER_API_ENDPOINT = `${BACKEND_URL}/api/user`;
export const JOB_API_ENDPOINT = `${BACKEND_URL}/api/job`;
export const APPLICATION_API_ENDPOINT = `${BACKEND_URL}/api/application`;
export const COMPANY_API_ENDPOINT = `${BACKEND_URL}/api/company`;
export const RESUME_API_ENDPOINT = `${BACKEND_URL}/api/resume`;

export const buildLogoUrl = (logo) => {
  if (!logo) return "";
  if (/^https?:\/\//i.test(logo)) return logo;
  return `${BACKEND_URL}${logo.startsWith("/") ? "" : "/"}${logo}`;
};

export const buildPhotoUrl = (photoPath) => {
  if (!photoPath) return "";
  if (/^https?:\/\//i.test(photoPath)) return photoPath;
  return `${BACKEND_URL}${photoPath.startsWith("/") ? "" : "/"}${photoPath}`;
};

export const buildResumeUrl = (resumePath) => {
  if (!resumePath) return "";
  if (/^https?:\/\//i.test(resumePath)) return resumePath;
  const filename = resumePath.split("/").filter(Boolean).pop();
  return `${RESUME_API_ENDPOINT}/${filename}`;
};
