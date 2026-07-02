import PrizePoolCard from "@/components/PrizePoolCard";
import RegisteredPlayersCard from "@/components/RegisteredPlayerCard";
import RegistrationCard from "@/components/RegistrationCard";
import TournamentTop from "@/components/TournamentTop";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TournamentPage({ params }: PageProps) {
  const { id } = await params;
  console.log(id);
  return (
    <div className=" flex flex-col min-h-screen mx-10 mt-10 gap-5">
      <TournamentTop image="/hero.png" />
      <div className="layout flex h-full gap-4">
        <div className="right h-full flex flex-col flex-7 ">
          <div className="overview h-[30vh] p-5 flex flex-col gap-5 bg-[#13192A] rounded-2xl">
            <h1 className="text-xl">Tournament Overview</h1>
            <p>Gear up for the battle</p>
            <div className="cards flex gap-5" >
              <div className="h-35 w-35  items-center justify-center flex flex-col gap-5 bg-[#111622] rounded-2xl">
                <div className="text-2xl text-white/50">Game</div>
                <div>BGMI</div>
              </div>
              <div className="h-35 w-35  items-center justify-center flex flex-col gap-5 bg-[#111622] rounded-2xl">
                <div className="text-2xl text-white/50">Game</div>
                <div>BGMI</div>
              </div>
              <div className="h-35 w-35  items-center justify-center flex flex-col gap-5 bg-[#111622] rounded-2xl">
                <div className="text-2xl text-white/50">Game</div>
                <div>BGMI</div>
              </div>
              <div className="h-35 w-35  items-center justify-center flex flex-col gap-5 bg-[#111622] rounded-2xl">
                <div className="text-2xl text-white/50">Game</div>
                <div>BGMI</div>
              </div>
            </div>
          </div>
          <RegisteredPlayersCard registered={17} total={100} />
          <div className="details "></div>
        </div>
        <div className="left flex flex-col flex-3 shrink-0 gap-3">
          <RegistrationCard />
          <PrizePoolCard/>
        </div>
      </div>
    </div>
  );
}
