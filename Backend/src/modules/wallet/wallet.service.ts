import mongoose from "mongoose";
import { Wallet } from "./wallet.model.js";
import { Transaction } from "../transaction/transaction.model.js";
import { AppError } from "../../utils/AppError.js";

export const createWalletService = async(userId:mongoose.Types.ObjectId)=>{
  // check if wallet already exists
  const exists =await Wallet.findOne({ userId })
  if (exists) {
    throw new AppError("Wallet alredy exists",400)
  }
  const wallet = await Wallet.create({
    userId,
    balance:100
  })
  return wallet
}
export const creditWalletService = async (
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
    { $inc: { balance: amount } },
    { session },
  );
  if (!wallet) throw new AppError("Wallet not found", 404);
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
  if (!wallet) throw new AppError("Wallet not found", 404);
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
export const checkWalletService = async (
  userId: mongoose.Types.ObjectId,
  session: mongoose.ClientSession,
) => {
  const wallet = await Wallet.findOne({ userId }).session(session);
  if (!wallet) throw new AppError("Wallet not found", 404);
  return wallet;
};
export const getWalletService = async (userId: mongoose.Types.ObjectId) => {
  const wallet = await Wallet.findOne({ userId })
  if (!wallet) throw new AppError("Wallet not Found", 404)
  return {
    balance:wallet.balance
  }
}