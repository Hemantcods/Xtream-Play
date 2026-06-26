import TournamentCard from './TournamentCard';

interface Tournament {
  id: string;
  name: string;
  game: string;
  startDate: Date;
  prizePool: number;
  participantCount: number;
}

// Mock data - in a real app, this would come from an API
const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Summer Championship 2024',
    game: 'Valorant',
    startDate: new Date('2024-07-15'),
    prizePool: 5000,
    participantCount: 128,
  },
  {
    id: '2',
    name: 'Spring Masters',
    game: 'League of Legends',
    startDate: new Date('2024-06-30'),
    prizePool: 7500,
    participantCount: 64,
  },
  {
    id: '3',
    name: 'Winter Clash',
    game: 'Counter-Strike: Global Offensive',
    startDate: new Date('2024-12-01'),
    prizePool: 10000,
    participantCount: 32,
  },
];

export default function TournamentsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Featured Tournaments
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  );
}