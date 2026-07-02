import { Award, Medal, Ribbon, Trophy } from "lucide-react";
import { Card } from "./ui/card";

const prizes = [
  {
    place: "1st Place",
    amount: "$2,500",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    place: "2nd Place",
    amount: "$1,500",
    icon: Medal,
    color: "text-gray-300",
  },
  {
    place: "3rd Place",
    amount: "$750",
    icon: Award,
    color: "text-orange-500",
  },
  {
    place: "4th Place",
    amount: "$250",
    icon: Ribbon,
    color: "text-blue-400",
  },
];

export default function PrizePoolCard() {
  return (
    <Card className="p-5 bg-[#111827] border-slate-800 text-white">
         <h3 className="font-semibold mb-5">Prize Pool</h3>
   
         <p className="text-sm text-slate-400">Total Prize</p>
   
         <h2 className="text-4xl font-bold text-red-500 mb-6">
           $5,000
         </h2>
   
         <div className="space-y-3">
           {prizes.map(({ place, amount, icon: Icon, color }) => (
             <div
               key={place}
               className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-none"
             >
               <div className="flex items-center gap-3">
                 <Icon className={`h-4 w-4 ${color}`} />
                 <span className="text-sm">{place}</span>
               </div>
   
               <span className="text-sm font-medium">
                 {amount}
               </span>
             </div>
           ))}
         </div>
   
         <button className="mt-6 w-full text-sm text-red-500 hover:text-red-400 transition">
           View Prize Breakdown
         </button>
       </Card>
  )
}