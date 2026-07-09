"use client";

import { useState } from "react";
import Link from "next/link";

import {
  CalendarDotsIcon,
  CrownIcon,
  HouseIcon,
  TrophyIcon,
  UserIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Toaster } from "@/components/ui/sonner";
import AuthGuard from "@/components/auth/AuthGaurd";

const Sidebar = [
  {
    id: 1,
    name: "Home",
    icon: HouseIcon,
    link: "/dashboard",
  },
  {
    id: 2,
    name: "My Tournaments",
    icon: TrophyIcon,
    link: "/dashboard/mytournaments",
  },
  {
    id: 3,
    name: "Schedule",
    icon: CalendarDotsIcon,
    link: "/dashboard/schedule",
  },
  {
    id: 4,
    name: "Leaderboard",
    icon: CrownIcon,
    link: "/dashboard/leaderboard",
  },
  {
    id: 5,
    name: "Contact Us",
    icon: UserIcon,
    link: "/dashboard/contact",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AuthGuard>
    <div className="flex h-screen bg-[#0B1120] overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-[#111622] p-2 text-white md:hidden"
      >
        <ListIcon size={28} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 h-full w-64 border-r border-gray-800 bg-[#111622] p-4
          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
          md:static
        `}
      >
        {/* Close Button Mobile */}
        <div className="flex justify-end md:hidden">
          <button onClick={() => setOpen(false)}>
            <XIcon size={28} />
          </button>
        </div>

        {/* Logo */}
        <div className="mt-4 flex flex-col items-center text-4xl font-bold">
          <div className="text-[#BF5555]">Xtreme</div>
          <div className="text-white">Play</div>
        </div>

        {/* Menu */}
        <div className="mt-10 flex flex-col gap-2 ">
          {Sidebar.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 hover:bg-[#1D2638] hover:text-white transition"
            >
              <item.icon size={26} weight="duotone" />

              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>
      <div className="flex flex-col h-full w-full flex-1">
        {/* Main */}
        <main className="flex-1 w-full min-h-screen overflow-y-scroll text-white md:ml-0 scrollbar-none">{children}</main>
        <Toaster/>
      </div>
    </div>
    </AuthGuard>
  );
}