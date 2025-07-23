"use client";
import api from "@/services/api";
import { IUser, updateProfile } from "@/store/features/auth/authSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useUpdateProfile({
  profile,
  setProfile,
  close,
}: {
  profile: IUser;
  setProfile: (profile: IUser) => void;
  close: () => void;
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: null as File | null,
  });
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        email: profile.email,
        avatar: null,
      });
      setAvatarPreview(profile.avatar || "");
    }
  }, [profile]);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
    }
  };
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("username", formData.username.trim());
      data.append("email", formData.email.trim());
      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }
      setLoadingUpdate(true);
      const res = await api.patch("/auth/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        dispatch(updateProfile(res.data.user));
        setProfile(res.data.user);
        toast.success(res.data.message);
        setLoadingUpdate(false);
        close();
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setLoadingUpdate(false);
    }
  };
  return {
    formData,
    setFormData,
    avatarPreview,
    handleAvatarChange,
    handleUpdateProfile,
    loadingUpdate,
  };
}
