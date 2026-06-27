"use client";
import LeaderboardTable from "@/components/Leaderboard";
import { userService } from "@/lib/services/userService";
import { ChartNoAxesCombined, Crown, Medal, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LeaderBoard } from "@/lib/services/userService";
const Page = () => {
  const [Board, setBoard] = useState<LeaderBoard[]|[]>([]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await userService.getLeaderBoard();
      console.log(data)
      setBoard(data);
    };
    fetchLeaderboard();
  });
  return (
    <div className="h-full bg-white flex flex-col w-full text-black gap-10 content-center p-10 ">
      <div className=" w-full h-[35vh] flex">
        <div className="w-[60%] h-full flex items-center justify-center gap-x-10 ">
          {/* Use a relative container to position the trophies */}
          <div className="relative  h-48 w-64">
            {/* 2nd Place Trophy */}
            <img
              className="absolute bottom-0 left-0"
              src="/trophy.svg"
              alt="2nd place"
              style={{ height: "120px", width: "auto" }}
            />

            {/* 1st Place Trophy (center and higher) */}
            <img
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              src="/trophy.svg"
              alt="1st place"
              style={{ height: "160px", width: "auto" }}
            />

            {/* 3rd Place Trophy */}
            <img
              className="absolute bottom-0 right-0"
              src="/trophy.svg"
              alt="3rd place"
              style={{ height: "100px", width: "auto" }}
            />
          </div>
          <div className="w-[50%] flex flex-col gap-y-5 h-full pt-10">
            <div className="title text-4xl font-extrabold">Leaderboard</div>
            <div className="bg-red-500 w-20 h-2 flex rounded-full"></div>
            <div className="text-xl font-extralight">
              <p>
                See who&apos;s on top! Compete, earn points , <br />
                and claim your place in the leaderboard.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full flex flex-col border rounded-2xl shadow-xl p-5">
          <div className="flex gap-x-3 content-center justify-center">
            <ChartNoAxesCombined color="red" />
            <div className="w-full flex text-2xl font-bold">Top Performers</div>
          </div>
          <div className=" flex justify-center gap-5 w-full h-full">
            <div className="bar flex flex-col justify-end w-15 content-center text-center">
              <div>{Board[1]?.name}</div>
              <div className="flex w-full justify-center">
                <Medal className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-[60%] bg-red-500 "></div>
            </div>
            <div className="bar flex flex-col justify-end w-15 content-center text-center">
              <div>{Board[0]?.name}</div>
              <div className="flex w-full justify-center ">
                <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="h-[80%] bg-red-500 "></div>
            </div>
            <div className="bar flex flex-col justify-end w-15 content-center text-center">
              <div>{Board[2]?.name}</div>
              <div className="flex w-full justify-center">
                <Trophy className="h-5 w-5 text-amber-700" />
              </div>
              <div className="h-[40%]  bg-red-500 "></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <LeaderboardTable Board={Board} />
      </div>
    </div>
  );
};

export default Page;
