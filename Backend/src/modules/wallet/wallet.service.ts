import mongoose from "mongoose";
import { Wallet } from "./wallet.model.js";
import { Transaction } from "../transaction/transaction.model.js";
import { AppError } from "../../utils/AppError.js";

export const creditWalletService = async (
  userId: mongoose.Types.ObjectId,
  amount: number,
  session: any,
  reason: string,
  tournamentId?: mongoose.Types.ObjectId,
  paymentId?: mongoose.Types.ObjectId,
  withdrawalId?: mongoose.Types.ObjectId,
) => {
  const wallet=await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { session },
  );
  if (!wallet)throw new AppError("Wallet not found",404)
  await Transaction.create(
    [
      {
        userId,
        amount,
        type: "credit",
        reason,
        tournamentId,
        paymentId,
        withdrawalId,
      },
    ],
    { session },
  );
};
export const debitWalletService = async (
  userId: mongoose.Types.ObjectId,
  amount: number,
  session: any,
  reason: string,
  tournamentId?: mongoose.Types.ObjectId,
  paymentId?: mongoose.Types.ObjectId,
  withdrawalId?: mongoose.Types.ObjectId,
) => {
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: -amount } },
    { session },
  );
  if(!wallet) throw new AppError("Wallet not found",404)
  await Transaction.create(
    [
      {
        userId,
        amount,
        type: "debit",
        reason,
        tournamentId,
        paymentId,
        withdrawalId,
      },
    ],
    { session },
  );
};
export const checkWalletService=async(userId:mongoose.Types.ObjectId,session:any)=>{
    const wallet=await Wallet.findOne({userId},{session})
    if(!wallet) throw new AppError("Wallet not found",404)
    return wallet
}