import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import mongoose from "mongoose";
import { GetTransactionsSchema } from "./transaction.schema.js";
import { getTransactionsService } from "./transaction.service.js";

export const getTransactionController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.user!._id)
  const { page, limit } = GetTransactionsSchema.parse(req.query)
  const Transactions=await getTransactionsService(userId,page,limit)
  res.status(200).json({
    success: true,
    message: "Transactions fetched successfully",
    data:Transactions
  })
})