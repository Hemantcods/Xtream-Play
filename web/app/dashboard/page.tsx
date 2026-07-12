'use client';
import TournamentCard from "@/components/TournamentCard";
import { useEffect, useState } from "react";
import { getAllTournaments } from "@/lib/services/tournamentService";
import { Tournament } from "@/types/tournament";

export default function Dashboard() {
  const [tournaments, setTournaments] = useState([] as Tournament[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const data = await getAllTournaments();
        setTournaments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tournaments");
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <div className="main flex w-full h-full ">
        <div className="left w-[30%] bg-[#19233A] h-full p-3 gap-y-5 ">
          <div className="text-4xl text-white font-bold">Active Tournaments</div>
          <div className="games flex flex-col py-2">
            <div className="py-3">Game</div>
            <div className="flex flex-wrap w-full gap-3">
              <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
                FreeFire
              </div>
              <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
                FreeFire
              </div>
              <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
                FreeFire
              </div>
            </div>
          </div>
          <div className="type flex flex-col py-2">
            <div className="py-3">Type</div>
            <div className="flex flex-wrap w-full gap-3">
              <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
                Solo
              </div>
              <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
                Duo
              </div>
              <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
                Squad
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll max-h-[60%] gap-y-5 flex flex-col  custom-scrollbar">
            {/* Loading skeletons */}
            {[1,2,3,4,5].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-64 border-2 border-white rounded-2xl p-4 flex flex-col">
                  <div className="text-2xl font-bold text-white h-6"></div>
                  <div className="flex justify-between mt-6 flex-1">
                    <div className="text-sm text-gray-400 flex flex-col gap-y-3">
                      <div>Per Kill</div>
                      <div className="text-white text-xl h-5"></div>
                    </div>
                    <div className="bar h-full w-px bg-white "/>
                    <div className="text-sm text-gray-400 flex flex-col gap-y-3">
                      <div>Entry Fee</div>
                      <div className="text-white text-xl h-5"></div>
                    </div>
                    <div className="bar h-full w-px bg-white "/>
                    <div className="text-sm text-gray-400 flex flex-col gap-y-3">
                      <div>Prize Pool</div>
                      <div className="text-white text-xl h-5"></div>
                    </div>
                    <div className="bar h-full w-px bg-white "/>
                    <div className="text-sm text-gray-400 flex flex-col gap-y-3">
                      <div>Status</div>
                      <div className="text-white text-xl h-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right w-[70%] h-full ">
          <div className="p-10">
            <div className="Image w-full h-96 overflow-hidden rounded-2xl ">
              <img src='/hero.png' alt="cover"  className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main flex w-full h-full ">
        <div className="left w-[30%] bg-[#19233A] h-full p-3 gap-y-5 ">
          <div className="text-4xl text-white font-bold">Active Tournaments</div>
          <div className="text-white text-center py-10">{error}</div>
        </div>
        <div className="right w-[70%] h-full ">
          <div className="p-10">
            <div className="Image w-full h-96 overflow-hidden rounded-2xl ">
              <img src="https://imgs.search.brave.com/yQ8EPqKXd9_Jw64QTX_F4ysg6A5L7oqeLeuGIbp7CKk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Z0Y2RuLm5l/dC9pbWFnZXMvdF9h/cHAtY292ZXItcy,/m_X2F1dG8vcC8wNzU1/NTZkNS1kNzA2LTRk/MTctYTc2ZS0xZjQw/M2JlNDZiM2IvMTUx/OTE2OTc4L2ZyZWUt/ZmlyZS1nYW1lbG9v/cC1GRi0xJTIwKDEp/LnBuZw" alt="cover"  className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main flex w-full h-full ">
      <div className="left w-[30%] bg-[#19233A] h-full p-3 gap-y-5 ">
        <div className="text-4xl text-white font-bold">Active Tournaments</div>
        <div className="games flex flex-col py-2">
          <div className="py-3">Game</div>
          <div className="flex flex-wrap w-full gap-3">
            <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
              FreeFire
            </div>
            <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
              FreeFire
            </div>
            <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
              FreeFire
            </div>
          </div>
        </div>
        <div className="type flex flex-col py-2">
          <div className="py-3">Type</div>
          <div className="flex flex-wrap w-full gap-3">
            <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
              Solo
            </div>
            <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
              Duo
            </div>
            <div className=" border-2 w-fit px-4 text-center rounded-lg text-sm text-white border-[#BF5555]">
              Squad
            </div>
          </div>
        </div>
        {/*<div className="overflow-y-scroll max-h-[60%] gap-y-5 flex flex-col  custom-scrollbar mt-10">
          {tournaments.map((tou) => (
            <TournamentCard
              key={tou._id}
              tournament={{
                id: tou._id,
                name: tou.name,
                game: tou.game,
                startDate: new Date(tou.StartTime),
                prizePool: tou.prizePool,
                participantCount: 0, // You might want to get this from your data
              }}
            />
          ))}
        </div>*/}
        <div className="gap-5 overflow-y-scroll max-h-[60%] gap-y-5 flex flex-col  custom-scrollbar mt-10">
          {tournaments.map((tournament) => (
            <TournamentCard
              key={tournament._id}
                tournament={{
                  id: tournament._id,
                  name: tournament.name,
                  game: tournament.game,
                  startDate: new Date(tournament.StartTime),
                  prizePool: tournament.prizePool,
                  entryFee: tournament.entryFee,
                  maxPlayers: tournament.maxPlayers,
                  participantCount: tournament.registeredPlayers ?? 0,
                  isCompleted: tournament.isCompleted,
                }}
            />
          ))}
        </div>
      </div>
      <div className="right w-[70%] h-full ">
        <div className="p-10">
          <div className="Image w-full h-96 overflow-hidden rounded-2xl ">
            <img src="" alt="cover"  className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}