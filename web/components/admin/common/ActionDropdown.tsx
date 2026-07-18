"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Action {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface ActionDropdownProps {
  actions: Action[];
  trigger?: React.ReactNode;
}

export default function ActionDropdown({
  actions,
  trigger,
}: ActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/10 hover:text-white transition-all"
      >
        {trigger || <EllipsisVertical className="h-4 w-4" />}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#1a2338] py-1 shadow-xl shadow-black/20">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                action.onClick();
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-all",
                action.variant === "destructive"
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              {action.icon && <action.icon className="h-4 w-4" />}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
