import TournamentCard from "@/Components/TournamentCard";
const data = {
  title: "FreeFire Solo Tournament",
  perkill: "₹ 10",
  entry: "₹ 50",
  prizepool: "₹ 5000",
  status: "Active",
};
export default function Dashboard() {
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
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
          <TournamentCard {...data} />
        </div>
      </div>
      <div className="right w-[70%] h-full ">
        <div className="p-10">
            <div className="Image w-full h-96 overflow-hidden rounded-2xl ">
                <img src="https://imgs.search.brave.com/yQ8EPqKXd9_Jw64QTX_F4ysg6A5L7oqeLeuGIbp7CKk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Z0Y2RuLm5l/dC9pbWFnZXMvdF9h/cHAtY292ZXItcyxm/X2F1dG8vcC8wNzU1/NTZkNS1kNzA2LTRk/MTctYTc2ZS0xZjQw/M2JlNDZiM2IvMTUx/OTE2OTc4L2ZyZWUt/ZmlyZS1nYW1lbG9v/cC1GRi0xJTIwKDEp/LnBuZw" alt="cover"  className="h-full w-full" />
            </div>
        </div>
      </div>
    </div>
  );
}
