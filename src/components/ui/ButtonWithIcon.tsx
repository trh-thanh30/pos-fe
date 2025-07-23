import React from "react";
interface ButtonWithIconProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}
export default function ButtonWithIcon({
  title,
  icon,
  disabled,
  type,
}: ButtonWithIconProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className="py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 justify-center w-full bg-gray-900 text-white rounded-md cursor-pointer hover:opacity-90 transition-opacity duration-300">
      {title}
      <span>{icon}</span>
    </button>
  );
}
