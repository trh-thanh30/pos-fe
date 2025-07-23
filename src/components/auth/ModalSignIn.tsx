import React, { useState } from "react";
import FormModalSignIn from "../form/FormModalSignIn";
import FormModalChangePassword from "../form/FormModalChangePassword";

export default function ModalSignIn({
  setChangeModalForm,
  onCloses,
}: {
  setChangeModalForm: () => void;
  onCloses?: () => void;
}) {
  const [switchChangePassword, setSwitchChangePassword] =
    useState<boolean>(false);
  return (
    <>
      {!switchChangePassword ? (
        <FormModalSignIn
          onCloses={onCloses!}
          setSwitchChangePassword={() => setSwitchChangePassword(true)}
          setChangeModalForm={setChangeModalForm}
        />
      ) : (
        <FormModalChangePassword setChangeModalForm={setChangeModalForm} />
      )}
    </>
  );
}
