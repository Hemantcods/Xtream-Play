"use client";

import { Construction } from "lucide-react";
import PageHeader from "@/components/admin/common/PageHeader";
import SectionCard from "@/components/admin/common/SectionCard";
import EmptyState from "@/components/admin/common/EmptyState";

export default function WalletPage() {
  const placeholderCards = [
    { title: "Total Revenue", value: "₹0" },
    { title: "Pending Withdrawals", value: "₹0" },
    { title: "Completed Withdrawals", value: "₹0" },
    { title: "Tournament Entry Revenue", value: "₹0" },
    { title: "Prize Pool Distributed", value: "₹0" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wallet"
        description="Platform wallet and revenue management"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderCards.map((card) => (
          <SectionCard key={card.title} title={card.title}>
            <p className="text-2xl font-bold text-white/40">{card.value}</p>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Manual Adjustments">
        <EmptyState
          icon={Construction}
          title="Coming Soon"
          description="Wallet management features are under development"
        />
      </SectionCard>
    </div>
  );
}
