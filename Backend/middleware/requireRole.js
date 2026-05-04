import { User } from "../models/user.model.js";

const requireRole = (...allowed) => async (req, res, next) => {
  try {
    if (!req.id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const user = await User.findById(req.id).select("role");
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }
    if (!allowed.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role", success: false });
    }
    req.role = user.role;
    next();
  } catch (err) {
    next(err);
  }
};

export default requireRole;
