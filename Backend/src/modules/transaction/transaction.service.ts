import mongoose from "mongoose";
import { getTransactionsRepo } from "./transaction.repository.js";

export async function getTransactionsService(
  userId: mongoose.Types.ObjectId,
  page: number,
  limit: number,
) {
  const skip = (page - 1) * limit;
  const { transactions, total } = await getTransactionsRepo({
    userId,
    skip,
    limit,
  });
  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
