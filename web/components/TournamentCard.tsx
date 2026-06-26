import Link from 'next/link';

interface Tournament {
  id: string;
  name: string;
  game: string;
  startDate: Date;
  prizePool: number;
  participantCount: number;
}

// Helper function to format date
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Link href={`/tournament/${tournament.id}`} className="block">
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {tournament.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-3">
              🎮 {tournament.game}
            </span>
            <span>
              📅 {formatDate(tournament.startDate)}
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Prize Pool:</strong> ${tournament.prizePool.toLocaleString()}
            </p>
            <p>
              <strong>Participants:</strong> {tournament.participantCount}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}