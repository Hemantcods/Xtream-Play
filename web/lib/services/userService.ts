import { apiFetch } from "../api";

export interface LeaderBoard {
  rank: number;
  totalPoints: number;
  name: string;
  totalEarning: number;
  totalWins: number;
}
export const userService = {
  getLeaderBoard: async (): Promise<LeaderBoard[]> => {
    const {data} = await apiFetch("/user/leaderboard", { method: "GET" });
    return data;
  },
};
