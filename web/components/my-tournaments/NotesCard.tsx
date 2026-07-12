import { AlertTriangle } from "lucide-react";
import type { Note } from "@/types/tournament";

interface NotesCardProps {
  notes: Note[];
}

export default function NotesCard({ notes }: NotesCardProps) {
  if (notes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <h3 className="text-sm font-semibold text-white">Important Notes</h3>
      </div>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="flex items-start gap-2 text-xs text-white/60">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
