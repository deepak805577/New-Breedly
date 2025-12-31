"use client";

import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!user) return <p className="p-6">Please login</p>;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔍 Preview before upload
    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      await uploadAvatar(file);
      alert("Profile picture updated ✅");
      setPreview(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex justify-center items-start pt-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          My Profile 🐾
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={
              preview ||
              profile?.avatar_url ||
              "/assets/boy.png"
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#e8c8a6]"
          />

          {/* Upload Button */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
              disabled={uploading}
            />
            <span className="px-4 py-2 rounded-full bg-[#e8c8a6] hover:bg-[#ddb58f] text-sm font-semibold">
              {uploading ? "Uploading..." : "Change Avatar"}
            </span>
          </label>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">
            {profile?.username || user.email.split("@")[0]}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
