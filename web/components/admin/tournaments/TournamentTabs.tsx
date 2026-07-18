"use client";

import { cn } from "@/lib/utils";

interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface TournamentTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function TournamentTabs({
  tabs,
  activeTab,
  onTabChange,
}: TournamentTabsProps) {
  return (
    <div className="flex gap-1 rounded-xl border border-white/10 bg-[#13192A] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all",
            activeTab === tab.key
              ? "bg-accent-brand/15 text-accent-brand"
              : "text-white/50 hover:text-white/80",
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px]",
                activeTab === tab.key
                  ? "bg-accent-brand/20"
                  : "bg-white/5 text-white/40",
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
