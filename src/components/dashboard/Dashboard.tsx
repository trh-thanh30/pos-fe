"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import DashProduct from "./DashProduct";
import DashAnalytics from "./DashAnalytics";
import DashOrder from "./DashOrder";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  return (
    <div className="p-4">
      {search === "analytics" && <DashAnalytics />}
      {search === "users" && <div>Users Section</div>}
      {search === "product" && <DashProduct />}
      {search === "order" && <DashOrder />}
      {!search && <div>Please select a section from the sidebar.</div>}
    </div>
  );
}
