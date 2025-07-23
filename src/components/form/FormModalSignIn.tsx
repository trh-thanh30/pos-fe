/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { FaCaretRight } from "react-icons/fa";
import InputPrimary from "../ui/InputPrimary";
import { useDispatch } from "react-redux";
import api from "@/services/api";
import { login } from "@/store/features/auth/authSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

export default function FormModalSignIn({
  setChangeModalForm,
  onCloses,
  setSwitchChangePassword,
}: {
  setChangeModalForm: () => void;
  onCloses: () => void;
  setSwitchChangePassword: () => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);
      if (res.status === 200) {
        setLoading(false);
        dispatch(login(res.data));
        onCloses();
        toast.success(res.data.message);
      }
    } catch (error: any) {
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
        Sign in to QuickCart Ecommerce
      </h1>
      <p className="text-sm text-gray-500 text-center mt-2">
        Welcome back! Please sign in to continue
      </p>
      <form onSubmit={handleSignIn} className="mt-8 flex flex-col gap-5">
        <InputPrimary
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          disabled={loading}
          name="email"
          onChange={onChange}
        />
        <InputPrimary
          label="Password"
          disabled={loading}
          isPassword
          placeholder="Enter your password"
          type="password"
          name="password"
          onChange={onChange}
        />
        <ButtonWithIcon
          disabled={loading}
          title={loading ? <LoadingSpinner size="xs" /> : "Sign In"}
          icon={<FaCaretRight />}
          type="submit"
        />
      </form>

      <button
        disabled={loading}
        onClick={setSwitchChangePassword}
        className="text-gray-900 text-sm w-full mt-5 text-center hover:underline cursor-pointer">
        Forgot Password?
      </button>

      <hr className="border-b border-t-gray-50 border-b-gray-300 my-6" />
      <p className="text-sm text-center text-gray-500">
        Don’t have an account?{" "}
        <button
          onClick={setChangeModalForm}
          disabled={loading}
          className="text-gray-900 hover:underline cursor-pointer">
          Sign up
        </button>
      </p>
    </>
  );
}
