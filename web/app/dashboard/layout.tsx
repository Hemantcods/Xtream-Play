import { CalendarDotsIcon, CrownIcon, HouseIcon, TrophyIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
const Sidebar = [
  { id: 1, name: "Home", icon:HouseIcon, link: "/dashboard" },
  {
    id: 2,
    name: "My Tournaments",
    icon: TrophyIcon,
    link: "/tournaments",
  },
  {
    id: 3,
    name: "Schedule",
    icon: CalendarDotsIcon,
    link: "/schedule",
  },
  {
    id: 4,
    name: "Leaderboard",
    icon: CrownIcon,
    link: "/leaderboard",
  },
  {
    id: 5,
    name: "Contact Us",
    icon: UserIcon,
    link: "/contact",
  },
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-50 border-r p-4 bg-[#111622]">
        <div className="title flex-col flex w-full align-items-center justify-content-center text-4xl font-bold capitalize text-center">
          <div className="text-[#BF5555]">Xtreme</div>
          <div className="text-white">play</div>
        </div>
        <div className="icons flex flex-col mt-10 gap-4 text-white">
          {Sidebar.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 hover:bg-[#1D2638] hover:text-white transition-all duration-200"
            >
              <item.icon size={26}  />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
