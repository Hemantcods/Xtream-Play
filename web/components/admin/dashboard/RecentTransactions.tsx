import { ArrowRight } from "lucide-react";
import SectionCard from "@/components/admin/common/SectionCard";
import StatusBadge from "@/components/admin/common/StatusBadge";
import type { AdminTransaction } from "@/types/admin";
import { formatDateTime } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions: AdminTransaction[];
  loading?: boolean;
}

const typeIcons: Record<string, string> = {
  registration: "+",
  payout: "-",
  refund: "↩",
};

export default function RecentTransactions({
  transactions,
  loading,
}: RecentTransactionsProps) {
  const display = transactions.slice(0, 5);

  return (
    <SectionCard title="Recent Transactions">
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-white/5"
            />
          ))}
        </div>
      ) : display.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">No transactions</p>
      ) : (
        <div className="space-y-2">
          {display.map((tx) => (
            <div
              key={tx._id}
              className="flex items-center justify-between rounded-lg p-2 transition-all hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    tx.type === "registration"
                      ? "bg-green-500/15 text-green-400"
                      : tx.type === "payout"
                        ? "bg-purple-500/15 text-purple-400"
                        : "bg-blue-500/15 text-blue-400"
                  }`}
                >
                  {typeIcons[tx.type]}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {tx.userName}
                  </p>
                  <p className="text-[11px] text-white/40">
                    {formatDateTime(tx.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="text-sm font-semibold text-white">
                  ₹{tx.amount}
                </span>
                <StatusBadge status={tx.status} />
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && display.length > 0 && (
        <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs text-white/40 hover:text-white/70 transition-all">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </SectionCard>
  );
}
