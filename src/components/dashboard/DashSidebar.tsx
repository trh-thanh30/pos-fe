"use client";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaProductHunt,
  FaUsers,
  FaChartPie,
  FaShoppingBag,
} from "react-icons/fa";

export default function DashSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = searchParams.get("search") || "analytics"; 
  const menuItems = [
    { key: "analytics", label: "Analytics", icon: <FaChartPie /> },
    { key: "users", label: "Users", icon: <FaUsers /> },
    { key: "product", label: "Products", icon: <FaProductHunt /> },
    { key: "order", label: "Orders", icon: <FaShoppingBag /> },
  ];

  const handleClick = (key: string) => {
    router.push(`/dashboard?search=${key}`);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleClick(item.key)}
          className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-md text-base font-medium
            transition-colors duration-200
            ${
              current === item.key
                ? "bg-orange-50 text-orange-500"
                : "text-gray-500 hover:bg-gray-100"
            }
          `}>
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
