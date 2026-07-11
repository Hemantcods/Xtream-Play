import TournamentPage from "@/pages/tournament"
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async  function TournamentP({ params }: PageProps) {
  const { id } = await params;
  return (
    <TournamentPage id={id} />
  )
}
