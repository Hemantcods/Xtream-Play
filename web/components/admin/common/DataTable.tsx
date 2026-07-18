import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "./EmptyState";
import { Inbox } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  cell: (item: T) => ReactNode;
  className?: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  mobileCard?: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
        >
          {Array.from({ length: 3 }).map((_, j) => (
            <td key={j} className="px-3 py-3.5">
              <Skeleton className="h-4 w-24 bg-white/10" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = "No data found",
  mobileCard,
  keyExtractor,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-3 py-3">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableSkeleton rows={5} />
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title={emptyMessage}
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn("px-3 py-3", col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn("px-3 py-3.5", col.className)}
                  >
                    {col.cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      {mobileCard && (
        <div className="flex flex-col gap-2 md:hidden">
          {data.map((item) => (
            <div key={keyExtractor(item)}>{mobileCard(item)}</div>
          ))}
        </div>
      )}
    </>
  );
}
