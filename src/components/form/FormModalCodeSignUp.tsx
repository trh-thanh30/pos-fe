/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import InputPrimary from "../ui/InputPrimary";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { FaCaretRight } from "react-icons/fa";
import api from "@/services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

export default function FormModalCodeSignUp({
  setChangeModalForm,
  userId,
}: {
  setChangeModalForm: () => void;
  userId: string;
}) {
  const [formData, setFormData] = useState({
    userId: userId,
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleActiveAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("auth/active-account", formData);
      if (res.data) {
        setChangeModalForm();
        toast.success(res.data?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center text-lg mt-5 font-medium text-gray-900 ">
        Check your email
      </h1>
      <p className="text-sm text-gray-500 text-center mt-2">
        Please check your email to continue registration
      </p>
      <form
        onSubmit={handleActiveAccount}
        action=""
        className="mt-8 flex flex-col gap-5">
        <InputPrimary
          disabled
          label="User id"
          placeholder="Enter your user id"
          type="text"
          name="userId"
          value={userId}
          onChange={onChange}
        />
        <InputPrimary
          disabled={loading}
          label="Code "
          placeholder="Enter your Code"
          type="text"
          name="code"
          onChange={onChange}
        />
        <ButtonWithIcon
          disabled={loading}
          title={loading ? <LoadingSpinner size="xs" /> : "Continue"}
          icon={<FaCaretRight />}
          type="submit"
        />
      </form>
      <hr className="border-b border-t-gray-50 border-b-gray-300 my-6" />
      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <button
          onClick={setChangeModalForm}
          className="text-gray-900 hover:underline cursor-pointer">
          Sign In
        </button>
      </p>
    </>
  );
}
