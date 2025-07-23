import React from "react";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { FaCaretRight } from "react-icons/fa";
import InputPrimary from "../ui/InputPrimary";

export default function FormModalChangePassword({
  setChangeModalForm,
}: {
  setChangeModalForm: () => void;
}) {
  return (
    <>
      <h1 className="text-center text-lg mt-5 font-medium text-gray-900 ">
        Change Password
      </h1>
      <p className="text-sm text-gray-500 text-center mt-2">
        Please enter your email address to continue
      </p>
      <form action="" className="mt-8 flex flex-col gap-5">
        <InputPrimary
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          name="email"
        />

        <ButtonWithIcon
          title="Continue"
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
  );
}
