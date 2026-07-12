import { HeadphonesIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
          <HeadphonesIcon className="h-5 w-5 text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">Need Help?</h3>
          <p className="mt-1 text-xs text-white/50">
            Having issues with registration? Join our Discord.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full gap-2 border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2]/10 hover:text-[#5865F2]"
          >
            <MessageCircle className="h-4 w-4" />
            Join Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
