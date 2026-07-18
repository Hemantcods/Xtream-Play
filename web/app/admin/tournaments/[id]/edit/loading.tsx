export default function EditTournamentLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded bg-white/10" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[#13192A] p-6"
          >
            <div className="mb-4 h-4 w-32 rounded bg-white/10" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-10 rounded-xl bg-white/5" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
