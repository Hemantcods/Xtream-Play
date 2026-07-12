import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TeamsHeaderProps {
  tournamentTitle: string;
  backHref: string;
}

export default function TeamsHeader({ tournamentTitle, backHref }: TeamsHeaderProps) {
  return (
    <div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Tournaments
      </Link>
      <div className="mt-2">
        <h1 className="text-2xl font-bold text-white lg:text-3xl">Registered Teams</h1>
        <p className="mt-1 text-sm text-white/50">{tournamentTitle}</p>
      </div>
    </div>
  );
}
