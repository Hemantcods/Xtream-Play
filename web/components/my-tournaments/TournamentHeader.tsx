import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/types/tournament";

interface TournamentHeaderProps {
  title: string;
  game: string;
  mode: {
    map?: string,
    player?:string,
    type?:string
  }
  status: TournamentStatus;
  bannerImage?: string;
  startTime: string;
  entryFee: number;
  teamType?: string;
  prizePool: number;
}

const statusConfig = {
  upcoming: { label: "UPCOMING", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  live: { label: "LIVE", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  completed: { label: "COMPLETED", className: "bg-green-500/20 text-green-400 border-green-500/30" },
};

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) + " " + d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TournamentHeader({
  title,
  game,
  mode,
  status,
  bannerImage="/hero.png",
  startTime,
  entryFee,
  teamType,
  prizePool,
}: TournamentHeaderProps) {
  const config = statusConfig[status];

  const infoItems = [
    {
      icon: (
        <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      ),
      label: "Start Time",
      value: formatDateTime(startTime),
      bg: "bg-yellow-500/10",
    },
    {
      icon: (
        <svg className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      ),
      label: "Entry Fee",
      value: `₹${entryFee.toLocaleString()}`,
      bg: "bg-green-500/10",
    },
    {
      icon: (
        <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      label: "Team Type",
      value: teamType,
      bg: "bg-blue-500/10",
    },
    {
      icon: (
        <svg className="h-4 w-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><path d="M4 22h16"/><path d="M10 22V12"/><path d="M14 22V12"/><path d="M12 22V2"/></svg>
      ),
      label: "Prize Pool",
      value: `₹${prizePool.toLocaleString()}`,
      bg: "bg-red-500/10",
    },
  ];

  return (
    <>
      {/* ===== Mobile Layout ===== */}
      <div className="md:hidden">
        <div
          className={cn(
            "relative w-full aspect-[16/9] overflow-hidden",
            status === "upcoming" && "bg-gradient-to-br from-[#1F2937] via-[#28354F] to-[#101726]",
            status === "live" && "bg-gradient-to-br from-[#2A1A1A] via-[#3F2020] to-[#1A1010]",
            status === "completed" && "bg-gradient-to-br from-[#1A2A1A] via-[#203F20] to-[#101A10]",
          )}
        >
          {bannerImage ? (
            <img src={bannerImage} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-6xl font-bold text-white/10">{game.charAt(0)}</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "rounded-full border px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider",
                config.className,
              )}
            >
              {config.label}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-extrabold text-white tracking-tight">{title}</h3>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[12px] font-semibold text-white/80">{game}</span>
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[12px] font-semibold text-white/80">{mode.player}</span>
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[12px] font-semibold text-white/80">{mode.map}</span>
          </div>

          <div className="mt-3.5 border-t border-white/10" />

          <div className="mt-3.5 grid grid-cols-2 gap-3">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">{item.label}</p>
                  <p className="text-[16px] font-bold text-white truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Desktop Layout ===== */}
      <div className="hidden md:flex items-stretch">
        <div className="relative w-[300px] lg:w-[30%] shrink-0">
          <div
            className={cn(
              "h-full rounded-xl overflow-hidden",
              status === "upcoming" && "bg-gradient-to-br from-[#1F2937] via-[#28354F] to-[#101726]",
              status === "live" && "bg-gradient-to-br from-[#2A1A1A] via-[#3F2020] to-[#1A1010]",
              status === "completed" && "bg-gradient-to-br from-[#1A2A1A] via-[#203F20] to-[#101A10]",
            )}
          >
            {bannerImage ? (
              <img src={bannerImage} alt={title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-6xl font-bold text-white/10">{game.charAt(0)}</span>
              </div>
            )}
            <div className="absolute top-2 left-2">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  config.className,
                )}
              >
                {config.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 py-4 lg:px-6 lg:py-5">
          <h3 className="text-xl font-extrabold text-white sm:text-2xl tracking-tight">{title}</h3>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-semibold text-white/80">{game}</span>
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-semibold text-white/80">{mode.player}</span>
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-semibold text-white/80">{mode.map}</span>
          </div>

          <div className="my-3.5 border-t border-white/10" />

          <div className="grid grid-cols-4 gap-4">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">{item.label}</p>
                  <p className="text-sm font-bold text-white ">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
