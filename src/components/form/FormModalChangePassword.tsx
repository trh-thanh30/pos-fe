import React, { useState } from "react";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { FaCaretRight } from "react-icons/fa";
import InputPrimary from "../ui/InputPrimary";
import api from "@/services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

export default function FormModalChangePassword({
  setChangeModalForm,
  onClose,
}: {
  setChangeModalForm: () => void;
  onClose?: () => void;
}) {
  const [steps, setSteps] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUerId] = useState<string>("");
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRetryPassword = async (e: React.FormEvent) => {
    console.log(email);
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/retry-password", {
        email,
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        setSteps(2);
        setUerId(res.data.userId);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/change-password", {
        ...formData,
        userId,
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        onClose!();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      {steps === 1 && (
        <>
          <h1 className="text-center text-lg mt-5 font-medium text-gray-900 ">
            Change Password
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Please enter your email address to continue
          </p>
          <form
            onSubmit={handleRetryPassword}
            className="mt-8 flex flex-col gap-5">
            <InputPrimary
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <ButtonWithIcon
              title={loading ? <LoadingSpinner size="xs" /> : "Continue"}
              icon={<FaCaretRight />}
              type="submit"
            />
          </form>

          <hr className="border-b border-t-gray-50 border-b-gray-300 my-6" />
          <p className="text-sm text-center text-gray-500">
            Back to sign up?{" "}
            <button
              onClick={setChangeModalForm}
              className="text-gray-900 hover:underline cursor-pointer">
              Sign Up
            </button>
          </p>
        </>
      )}

      {steps === 2 && (
        <>
          <h1 className="text-center text-lg mt-5 font-medium text-gray-900 ">
            Change Password
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Don&apos;t worry we will help you recover your account.
          </p>
          <form
            onSubmit={handleChangePassword}
            className="mt-4 flex flex-col gap-5">
            <InputPrimary type="text" name="userId" value={userId} />
            <InputPrimary
              type="text"
              placeholder="Enter your code"
              name="code"
              label="Code"
              onChange={handleChange}
            />
            <InputPrimary
              type="password"
              name="password"
              placeholder="Enter your password"
              isPassword
              label="Password"
              onChange={handleChange}
            />
            <InputPrimary
              isPassword
              type="password"
              name="confirmPassword"
              placeholder="Enter your confirm password"
              label="Confirm Password"
              onChange={handleChange}
            />

            <ButtonWithIcon
              title="Change Password"
              icon={<FaCaretRight />}
              type="submit"
            />
          </form>

          <hr className="border-b border-t-gray-50 border-b-gray-300 my-6" />
          <p className="text-sm text-center text-gray-500">
            Back to sign up?{" "}
            <button
              onClick={setChangeModalForm}
              className="text-gray-900 hover:underline cursor-pointer">
              Sign Up
            </button>
          </p>
        </>
      )}
    </>
  );
}
