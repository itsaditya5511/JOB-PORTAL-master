import { ZodError } from "zod";

export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}`, success: false });
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      success: false,
    });
  }

  if (err?.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({
      message: `${field} already exists`,
      success: false,
    });
  }

  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }

  if (err?.name === "CastError") {
    return res.status(400).json({ message: "Invalid id", success: false });
  }

  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }

  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error("UNHANDLED ERROR:", err);

  res.status(status).json({
    message: err.publicMessage || (status >= 500 ? "Server error" : err.message),
    success: false,
  });
};
