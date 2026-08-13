"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { User as UserIcon, LogOut } from "lucide-react";
import Image from "next/image";

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Obtener sesión actual
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Escuchar cambios de estado en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-zinc-200 animate-pulse" />;
  }

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 rounded-lg border border-zinc-300  px-3 py-1.5 text-xs font-semibold text-zinc-700  hover:bg-zinc-100  transition"
      >
        <UserIcon className="h-4 w-4" />
        <span>Iniciar sesión</span>
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const name = user.user_metadata?.full_name || user.email;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name || "User Avatar"}
            width={32}
            height={32}
            className="rounded-full border border-emerald-500"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden sm:inline text-xs font-medium text-zinc-700  line-clamp-1 max-w-25">
          {name}
        </span>
      </div>

      <button
        onClick={handleLogout}
        title="Cerrar sesión"
        className="p-1.5 text-zinc-500 hover:text-red-500 transition"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}