"use client";
import React, { useState } from "react";
import FormModalEmailSignUp from "../form/FormModalSignUp";
import FormModalCodeSignUp from "../form/FormModalCodeSignUp";

export default function ModalSignup({
  setChangeModalForm,
}: {
  setChangeModalForm: () => void;
}) {
  const [steps, setSteps] = useState<number>(1);
  const [userId, setUserId] = useState<string>("");
  return (
    <>
      {steps === 1 && (
        <FormModalEmailSignUp
          setSteps={setSteps}
          setChangeModalForm={setChangeModalForm}
          setUserId={setUserId}
        />
      )}
      {steps === 2 && (
        <FormModalCodeSignUp
          userId={userId}
          setChangeModalForm={setChangeModalForm}
        />
      )}
    </>
  );
}
