"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) {
          setProfile(profileData);
        }
      }

      setLoading(false);
    };

    getUserAndProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUserAndProfile();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, profile, loading };
}
