import { Request, Response, NextFunction } from "express";
import { verifyAcessToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import { User } from "../modules/user/user.model.js";
import { IUser } from "../modules/user/user.model.js"; // adjust path
export interface AuthRequest extends Request {
  user?: IUser;
}
export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AppError("Access denied. No token provided.", 401);
    }

    const decoded = verifyAcessToken(token);
    const userId = decoded.userId;

    // Fetch user from database to get role and other details
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new AppError("User not found", 401);
    }

    // Attach user info to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Invalid token", 401));
    }
  }
};

// Middleware to check if user is admin
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new AppError("Access denied. Admin only.", 403));
  }
};