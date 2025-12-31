"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      alert("Please login first!");
      // Save intended page
      sessionStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  if (loading || !user) return null;

  return <>{children}</>;
}
