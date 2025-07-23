// app/dashboard/layout.tsx
import type { Metadata } from "next";
import React from "react";
import DashSidebar from "@/components/dashboard/DashSidebar";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "Dashboard | Acenda",
  description: "Your admin dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[280px_1fr] min-h-screen bg-gray-50">
        <aside className="border-r border-gray-200 bg-white shadow-sm">
          <DashSidebar />
        </aside>
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}
