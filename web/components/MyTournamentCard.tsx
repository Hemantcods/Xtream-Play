import React from "react";

interface MyTournamentCardProps {
  title: string;
  perkill: string;
  entry: string;
  prizepool: string;
  status: string;
}

export default function MyTournamentCard({ title, perkill, entry, prizepool, status }: MyTournamentCardProps) {
  return (
    <div className="w-full h-40 border-2 border-white rounded-2xl p-4 flex flex-col">
      {/* Title */}
      <div className="text-2xl font-bold text-white">
        {title}
      </div>

      {/* Details */}
      <div className="flex justify-between mt-6 flex-1">
        <div className="text-sm text-gray-400 flex flex-col gap-y-3">
          <div>Per Kill</div>
          <div className="text-white text-xl">
            {perkill}
          </div>
        </div>

        <div className="h-full w-px bg-white" />

        <div className="text-sm text-gray-400 flex flex-col gap-y-3">
          <div>Entry Fee</div>
          <div className="text-white text-xl">
            {entry}
          </div>
        </div>

        <div className="h-full w-px bg-white" />

        <div className="text-sm text-gray-400 flex flex-col gap-y-3">
          <div>Prize Pool</div>
          <div className="text-white text-xl">
            {prizepool}
          </div>
        </div>

        <div className="h-full w-px bg-white" />

        <div className="text-sm text-gray-400 flex flex-col gap-y-3">
          <div>Status</div>
          <div className="text-white text-xl">
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}