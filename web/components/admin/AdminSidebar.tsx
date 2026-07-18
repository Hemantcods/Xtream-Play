"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListChecks,
  Users,
  UsersRound,
  Trophy,
  Wallet,
  UserCog,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Tournaments", href: "/admin/tournaments", icon: ListChecks },
  { label: "Participants", href: "/admin/participants", icon: Users },
  { label: "Teams", href: "/admin/teams", icon: UsersRound },
  { label: "Leaderboard", href: "/admin/leaderboard", icon: Trophy },
  { label: "Wallet", href: "/admin/wallet", icon: Wallet },
  { label: "Users", href: "/admin/users", icon: UserCog },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 h-full w-64 border-r border-white/10 bg-[#111622] p-4 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0",
        )}
      >
        {/* Close button */}
        <div className="flex justify-end md:hidden">
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Logo */}
        <Link href="/admin" className="mt-4 flex flex-col items-center text-4xl font-bold">
          <div className="text-accent-brand">Xtreme</div>
          <div className="text-white">Play</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Admin Panel
          </div>
        </Link>

        {/* Navigation */}
        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-accent-brand/15 text-accent-brand"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
