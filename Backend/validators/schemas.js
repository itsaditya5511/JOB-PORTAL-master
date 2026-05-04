import { z } from "zod";

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");

export const registerSchema = z.object({
  fullname: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  phoneNumber: z.string().trim().regex(/^\+?\d{7,15}$/, "Invalid phone number"),
  password: z.string().min(8).max(128),
  role: z.enum(["Student", "Recruiter"]),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
  role: z.enum(["Student", "Recruiter"]),
});

export const profileUpdateSchema = z.object({
  bio: z.string().max(1000).optional(),
  skills: z.string().optional(),
});

export const postJobSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10),
  requirements: z.string().trim().min(1),
  salary: z.coerce.number().int().nonnegative(),
  location: z.string().trim().min(1),
  jobType: z.string().trim().min(1),
  experience: z.coerce.number().int().min(0).max(60),
  position: z.coerce.number().int().min(1),
  companyId: objectId,
});

export const registerCompanySchema = z.object({
  companyName: z.string().trim().min(1).max(120),
});

export const updateCompanySchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  description: z.string().max(2000).optional(),
  website: z.string().url().optional().or(z.literal("")),
  location: z.string().max(200).optional(),
});

export const applicationStatusSchema = z.object({
  status: z
    .string()
    .transform((s) => s.toLowerCase())
    .pipe(z.enum(["pending", "reviewing", "shortlisted", "accepted", "rejected", "hired"])),
});

export const idParamSchema = z.object({ id: objectId });
