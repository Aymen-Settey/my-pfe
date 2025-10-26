const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const err = new Error("Not authorized, no token");
      err.status = 401;
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      const err = new Error("User not found");
      err.status = 401;
      return next(err);
    }

    req.user = user;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        const err = new Error("Authentication required");
        err.status = 401;
        return next(err);
      }

      if (!roles.includes(req.user.role)) {
        const err = new Error("Access forbidden: insufficient role");
        err.status = 403;
        return next(err);
      }
      next();
    } catch (err) {
      err.status = 401;
      next(err);
    }
  };
};
