"use client";

import { Wallet } from "lucide-react";
import { useGetWalletQuery } from "@/store/api/walletApi";

export default function WalletBalance() {
  const { data, isLoading, isError } = useGetWalletQuery();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5" />
        <span>...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5" />
        <span>--</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-white">
      <Wallet className="h-5 w-5 text-white" />
      <span className="font-semibold">
        ₹{data?.data.balance.toLocaleString()}
      </span>
    </div>
  );
}