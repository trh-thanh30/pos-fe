"use client";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface InputPrimaryProps {
  type: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name: string;
  className?: string;
  label?: string;
  isPassword?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: string;
}

export default function InputPrimary({
  type,
  label,
  placeholder,
  defaultValue,
  onChange,
  value,
  name,
  className,
  isPassword,
  disabled,
  hidden,
}: InputPrimaryProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between">
          <label
            className={`text-sm font-medium ${
              disabled ? "text-gray-500" : "text-gray-900"
            }  cursor-pointer `}>
            {label}
          </label>
          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              className="text-lg font-medium text-gray-500 cursor-pointer hover:text-gray-900">
              {showPassword ? <BsEye /> : <BsEyeSlash />}
            </button>
          )}
        </div>
      )}
      <input
        defaultValue={defaultValue}
        hidden={hidden}
        disabled={disabled}
        type={`${isPassword && showPassword ? "text" : type}` || type}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        value={value}
        name={name}
        className={`text-xs disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-300 text-gray-900 font-medium focus:bg-gray-100 placeholder:font-normal placeholder:text-gray-500 py-2 px-4 w-full
    rounded-md border border-gray-300
    focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-500
    transition duration-200 ease-in-out
    ${className}
  `}
      />
    </div>
  );
}
