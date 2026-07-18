"use client";

import { Construction } from "lucide-react";
import PageHeader from "@/components/admin/common/PageHeader";
import EmptyState from "@/components/admin/common/EmptyState";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage platform users"
      />

      <div className="rounded-2xl border border-white/10 bg-[#13192A]">
        <EmptyState
          icon={Construction}
          title="Coming Soon"
          description="User management features are under development"
        />
      </div>
    </div>
  );
}
