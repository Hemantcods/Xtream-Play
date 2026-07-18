"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopNav from "@/components/admin/AdminTopNav";
import AuthGuard from "@/components/auth/AuthGaurd";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#0B1120] overflow-hidden">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-col flex-1 w-full min-w-0">
          <AdminTopNav onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </AuthGuard>
  );
}
