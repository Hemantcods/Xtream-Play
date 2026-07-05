import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TournamentTopProps {
  image: string;
}

export default function TournamentTop({ image }: TournamentTopProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#13192A]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Tournament Banner"
          fill
          priority
          className="object-cover object-center lg:object-right"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1020] via-[#0B1020]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[220px] flex-col justify-between p-5 lg:min-h-[280px] lg:p-8">
        {/* Back */}
        <Link
          href="/dashboard"
          className="flex w-fit items-center gap-2 text-sm text-white/80 transition hover:text-white cursor-pointer "
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold lg:text-5xl">
            BGMI Pro League
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
              BGMI
            </span>

            <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
              Squad
            </span>

            <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
              Registration Open
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}