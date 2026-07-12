import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/types/tournament";

export interface TabItem {
  key: string;
  label: string;
  count: number;
}

interface TournamentTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function TournamentTabs({
  tabs,
  activeTab,
  onTabChange,
}: TournamentTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
            activeTab === tab.key
              ? "bg-red-500/20 text-red-400 shadow-sm shadow-red-500/10"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80",
          )}
        >
          {tab.label}
          <span
            className={cn(
              "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
              activeTab === tab.key
                ? "bg-red-500/30 text-red-300"
                : "bg-white/10 text-white/50",
            )}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
