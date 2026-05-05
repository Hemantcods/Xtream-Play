import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ITransaction extends Document{
    userId:mongoose.Types.ObjectId,
    amount:Number,
    type:"credit"|"debit",
    reason:"deposit"|"withdraw"|"tournament_join"|"tournament_refund"|"tournament_reward",
    tournamentId?:mongoose.Types.ObjectId,
    paymentId?:mongoose.Types.ObjectId,
    withdrawalId?:mongoose.Types.ObjectId
}

const TransactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  amount: { type: Number, required: true },

  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true
  },

  reason: {
    type: String,
    enum: [
      "deposit",
      "withdraw",
      "tournament_join",
      "tournament_refund",
      "tournament_reward"
    ],
    required: true
  },

  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament"
  },

  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "Payment"
  },

  withdrawalId: {
    type: Schema.Types.ObjectId,
    ref: "Withdrawal"
  }

}, { timestamps: true });

export const Transaction=mongoose.model("Transaction",TransactionSchema)