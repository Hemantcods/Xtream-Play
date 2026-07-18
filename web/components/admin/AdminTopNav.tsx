"use client";

import { usePathname } from "next/navigation";
import { Menu, ChevronRight, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";

interface AdminTopNavProps {
  onMenuClick: () => void;
}

const routeLabels: Record<string, string> = {
  admin: "Admin",
  tournaments: "Tournaments",
  participants: "Participants",
  teams: "Teams",
  leaderboard: "Leaderboard",
  wallet: "Wallet",
  users: "Users",
  settings: "Settings",
  create: "Create",
};

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-1.5 text-xs text-white/40">
      {segments.map((segment, i) => {
        const label = routeLabels[segment] || segment;
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            <span className={isLast ? "text-white/80" : ""}>{label}</span>
          </span>
        );
      })}
    </div>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
    } catch {}
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand hover:bg-accent-brand/25 transition-all"
      >
        <User className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#1a2338] py-1 shadow-xl shadow-black/20">
          <div className="border-b border-white/10 px-3 py-2">
            <p className="text-sm font-medium text-white">{user?.name || "Admin"}</p>
            <p className="text-xs text-white/40">{user?.email || "admin@xtreamplay"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminTopNav({ onMenuClick }: AdminTopNavProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#0B1120] px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white md:hidden transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Breadcrumbs />
      </div>
      <ProfileMenu />
    </header>
  );
}
