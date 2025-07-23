import Image from "next/image";
import React, { useRef } from "react";
import InputPrimary from "../ui/InputPrimary";
import LoadingSpinner from "../common/LoadingSpinner";

import useGetProfile from "@/hooks/useGetProfile";
import useUpdateProfile from "@/hooks/useUpdateProfile";

export default function ModalProfile({ close }: { close: () => void }) {
  const { loading, profile, setProfile } = useGetProfile();
  const {
    avatarPreview,
    handleAvatarChange,
    formData,
    setFormData,
    loadingUpdate,
    handleUpdateProfile,
  } = useUpdateProfile({
    profile: profile!,
    close,
    setProfile,
  });
  const refAvatar = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-1 text-center">
            Profile details
          </h2>
          <p className="text-gray-600 text-center text-sm">
            This is where you can manage your profile.
          </p>
          <form
            onSubmit={handleUpdateProfile}
            className="flex flex-col items-center mt-6 gap-5">
            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt="avatar"
                width={100}
                height={100}
                onClick={() => refAvatar.current?.click()}
                className="object-cover rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-300 w-24 h-24"
              />
            )}
            <input
              disabled={loadingUpdate}
              type="file"
              ref={refAvatar}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
            <div className="w-full">
              <InputPrimary
                disabled={loadingUpdate}
                label="Username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                type="text"
              />
            </div>
            <div className="w-full">
              <InputPrimary
                disabled={loadingUpdate}
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                type="email"
              />
            </div>
            <button
              disabled={loadingUpdate}
              type="submit"
              className="w-full border text-sm flex items-center disabled:cursor-not-allowed disabled:opacity-70 justify-center font-normal border-gray-500 text-gray-800 py-2 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300">
              {loadingUpdate ? <LoadingSpinner size="sm" /> : "Save Changes"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
