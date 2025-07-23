/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import InputPrimary from "../ui/InputPrimary";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { FaCaretRight } from "react-icons/fa";
import api from "@/services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

export default function FormModalEmailSignUp({
  setChangeModalForm,
  setSteps,
  setUserId,
}: {
  setChangeModalForm: () => void;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", formData);
      if (res.status === 201) {
        setSteps(2);
        setLoading(false);
        setUserId(res.data.userId);
        toast.success(res.data?.message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const firstError = error.response.data.errors[0];
        if (firstError && firstError.msg) {
          toast.error(firstError.msg);
        }
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-center text-lg mt-5 font-medium text-gray-900 ">
        Create your account
      </h1>
      <p className="text-sm text-gray-500 text-center mt-2">
        Welcome! Please fill in the details to get started.
      </p>
      <form onSubmit={handleSignUp} className="mt-8 flex flex-col gap-5">
        <InputPrimary
          disabled={loading}
          label="Username"
          placeholder="Enter your username"
          type="text"
          name="username"
          onChange={onChange}
        />
        <InputPrimary
          disabled={loading}
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          name="email"
          onChange={onChange}
        />
        <InputPrimary
          disabled={loading}
          label="Password"
          placeholder="Enter your email address"
          type="password"
          isPassword
          name="password"
          onChange={onChange}
        />
        <ButtonWithIcon
          disabled={loading}
          title={loading ? <LoadingSpinner size="xs" /> : "Sign Up"}
          icon={loading ? null : <FaCaretRight />}
          type="submit"
        />
      </form>
      <hr className="border-b border-t-gray-50 border-b-gray-300 my-6" />
      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <button
          disabled={loading}
          onClick={setChangeModalForm}
          className="text-gray-900 hover:underline cursor-pointer">
          Sign In
        </button>
      </p>
    </>
  );
}
