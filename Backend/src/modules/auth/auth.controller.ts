import { Request, Response, NextFunction } from "express";
import { getMeService, loginUser, registerUser } from "../auth/auth.service.js";
import { validateLogin, validateRegister } from "../auth/auth.validator.js";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { User } from "../user/user.model.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookies.js";

// after regitering the user send back the user
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validateRegister(req.body);
    if (error) {
      throw new AppError(error, 409);
    }
    await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email using the OTP sent to your inbox",
    });
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validateLogin(req.body);
    if (error) {
      throw new AppError(error, 400);
    }
    const { user, accessToken, refreshToken } = await loginUser(req.body);
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      data: user,
    });
  },
);
export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data=getMeService(req.user!)
  res.status(200).json({
    success: true,
    data: {
      user: data,
    },
  });
});
export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }
    const verified = verifyRefreshToken(refreshToken);
    if (!verified) {
      throw new AppError("RefrehToken is expired", 400);
    }
    const userid = verified.userId;
    const user = await User.findById(userid).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", 400);
    }
    const newToken = generateAccessToken(userid);
    setAccessTokenCookie(res, newToken);
    res.status(200).json({
      success: true,
      data: {
        accessToken: newToken,
      },
    });
  },
);
