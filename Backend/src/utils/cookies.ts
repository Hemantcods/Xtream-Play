import { Response, CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string
) => {
  res.cookie("accessToken", accessToken, {
    ...baseCookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
) => {
  res.cookie("refreshToken", refreshToken, {
    ...baseCookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", baseCookieOptions);
  res.clearCookie("refreshToken", baseCookieOptions);
};