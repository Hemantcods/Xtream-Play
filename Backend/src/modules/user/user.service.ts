import mongoose from "mongoose";
import { User } from "./user.model.js";
import { AppError } from "../../utils/AppError.js";
import { Wallet } from "../wallet/wallet.model.js";
import { Participant } from "../participant/participant.model.js";

export const LeaderBoardService = async () => {
  const users = await User.find()
    .select("name totalPoints totalEarnings totalWins")
    .sort({ totalPoints: -1 })
    .limit(100)
    .lean();

  return users.map((user, index) => ({
    rank: index + 1,
    ...user,
  }));
};
export const getAdminUserByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid user Id", 400);
  }
  const user = await User.findById(id).select("-password -refreshToken").lean();
  if (!user) {
    throw new AppError("No user found", 404);
  }
  const wallet = await Wallet.findOne({ userId: id }).lean();
  const tournamentStats = await Participant.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: "$userId",
        tournamentsPlayed: { $sum: 1 },
        totalKills: { $sum: "$stats.kills" },
        wins: {
          $sum: {
            $cond: [{ $eq: ["$stats.rank", 1] }, 1, 0],
          },
        },
      },
    },
  ]);
  return {
    user,
    wallet,
    stats:tournamentStats[0] ?? {
        tournamentsPlayed: 0,
        totalKills: 0,
        totalEarnings: 0,
        wins: 0,
      }
  }
};
