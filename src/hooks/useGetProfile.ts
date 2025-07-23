"use client";
import api from "@/services/api";
import { IUser } from "@/store/features/auth/authSlice";
import { useEffect, useState } from "react";

export default function useGetProfile() {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/profile");
        if (res.status === 200) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);
  return {
    profile,
    loading,
    setProfile,
    setLoading,
  };
}
