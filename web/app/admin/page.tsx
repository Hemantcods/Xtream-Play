"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/common/PageHeader";
import DashboardStatsGrid from "@/components/admin/dashboard/DashboardStatsGrid";
import RecentTransactions from "@/components/admin/dashboard/RecentTransactions";
import RecentRegistrations from "@/components/admin/dashboard/RecentRegistrations";
import LatestTournaments from "@/components/admin/dashboard/LatestTournaments";
import {
  mockAdminStats,
  mockTransactions,
  mockRegistrations,
  mockAdminTournaments,
} from "@/mock/admin";

export default function AdminDashboardPage() {
  const [loading] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your platform"
      />

      <DashboardStatsGrid stats={mockAdminStats} loading={loading} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RecentTransactions
          transactions={mockTransactions}
          loading={loading}
        />
        <RecentRegistrations
          registrations={mockRegistrations}
          loading={loading}
        />
        <LatestTournaments
          tournaments={mockAdminTournaments}
          loading={loading}
        />
      </div>
    </div>
  );
}
