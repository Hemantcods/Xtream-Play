// repositories/transaction.repository.ts

import mongoose from "mongoose";
import { Transaction } from "./transaction.model.js";

interface GetTransactionsRepoProps {
  userId: mongoose.Types.ObjectId;
  skip: number;
  limit: number;
}

export const getTransactionsRepo = async ({
  userId,
  skip,
  limit,
}: GetTransactionsRepoProps) => {
  const filter = { userId };

  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Transaction.countDocuments(filter),
  ]);

  return {
    transactions,
    total,
  };
};
