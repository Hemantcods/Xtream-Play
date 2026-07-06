import PrizePoolCard from "@/components/PrizePoolCard";
import RegisteredPlayersCard from "@/components/RegisteredPlayerCard";
import RegistrationCard from "@/components/RegistrationCard";
import TournamentDetailsCard, {
  TournamentOverview,
} from "@/components/TournamentDetailsCard";
import TournamentTop from "@/components/TournamentTop";
import { getTournamentById } from "@/lib/services/tournamentService";
import { Tournament } from "@/types/tournament";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TournamentPage({ params }: PageProps) {
  const { id } = await params;
  let TournamentData: Tournament | null = null;
  try {
    TournamentData = await getTournamentById(id);
  } catch (error) {
    console.log(error);
  }
  if (!TournamentData) {
    notFound();
  }
  return (
    <div className=" flex flex-col min-h-screen mx-4 mt-6 lg:mx-10 lg:mt-10 gap-5">
      <TournamentTop image="/hero.png" />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="order-2 lg:order-1 flex flex-col gap-4 lg:flex-[7]">
          <TournamentOverview tournament={TournamentData} />
          <RegisteredPlayersCard registered={TournamentData?.registeredPlayers as number} total={TournamentData?.maxPlayers as number} />
          <TournamentDetailsCard tournament={TournamentData} />
        </div>

        <div className="order-1 lg:order-2 flex flex-col gap-4 lg:flex-[3]">
          <RegistrationCard endDate={TournamentData?.StartTime as string} />
          <PrizePoolCard tournament={TournamentData} />
        </div>
      </div>
    </div>
  );
}
