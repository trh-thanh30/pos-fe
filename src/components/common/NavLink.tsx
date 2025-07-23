"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({
  title,
  link,
}: {
  link: string;
  title: string;
}) {
  const pathName = usePathname();
  const isActive = link === "/" ? pathName === "/" : pathName.startsWith(link);
  return (
    <Link
      className={`hover:text-gray-900 text-base font-medium transition-colors duration-300 ${
        isActive ? "text-gray-900" : "text-gray-500"
      } "`}
      href={link}>
      {title}
    </Link>
  );
}
