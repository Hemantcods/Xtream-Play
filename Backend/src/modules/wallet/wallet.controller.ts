import { Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { getWalletService } from "./wallet.service.js";

export const GetWalletController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!._id;
    const wallet = await getWalletService(userId);
    res.status(200).json({
      success: true,
      message: "Wallet fetched Successfully",
      data: wallet,
    });
  },
);
