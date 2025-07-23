"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import DashProduct from "./DashProduct";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  return (
    <div className="p-4">
      {search === "product" && <DashProduct />}
      {search === "users" && <div>Users Section</div>}
      {search === "analytics" && <div>Analytics Section</div>}
      {search === "order" && <div>Orders Section</div>}
      {!search && <div>Please select a section from the sidebar.</div>}
    </div>
  );
}
