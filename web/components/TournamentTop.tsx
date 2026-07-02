import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";


interface TournamentTopProps {
  image: string;
}
export default function TournamentTop({image}:TournamentTopProps) {
  return (
    <div className="upperpart  relative h-[25vh] overflow-hidden rounded-2xl shrink-0">
      <div className="absolute inset-0 z-0">
        <Image
            src={image}
            alt="Hero"
            fill
            className="object-cover  scale-110 object-right  translate-x-100  [mask-image:linear-gradient(90deg,transparent,black_40%,black)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_40%,black)]"
            priority
        />
      </div>
      <div className="relative h-full w-full z-10 flex flex-col m-5 justify-evenly ">
        <div className="flex text-white content-center gap-3 ">
          <ArrowLeftIcon size={20} />
          Back to Tournaments
        </div>
        <div className="title text-5xl font-bold">
          Pro Leauge  
        </div>
        <div className="flex gap-x-4">
          <div className="border px-4 rounded-full ">
            BGMI
          </div>
          <div className="border px-4 rounded-full ">
            Squad
          </div>
          <div className="border px-4 rounded-full border-green-500 text-green-500 ">
            Regrestrations Open
          </div>
        </div>
      </div>
    </div>
  )
}