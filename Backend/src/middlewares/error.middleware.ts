import { Request, Response, NextFunction } from "express";
import z, { success, ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error(err);

  // ZOD validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors:z.treeifyError(err)
    })
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success:false,
    message: err.message || "Server Error"
  });

};