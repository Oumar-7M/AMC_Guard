// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/types/authUser";
import { ApiResponse } from "@/types/api";
import { LoginFormData } from "@/types/loginFormData";
import { parseJwt } from "@/utils/jwt";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* ==========================
      🔄 REHYDRATATION AU LOAD
  ========================== */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = parseJwt(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  /* ==========================
      🔒 LOGIN
  ========================== */
  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      // Toujours lire le texte, même si le token est null
      const text = await res.text();
      if (!text) throw new Error("Réponse serveur vide");

      const json: ApiResponse = JSON.parse(text);

      // Si erreur serveur
      if (!res.ok) {
        throw new Error(json.error || "Erreur de connexion");
      }

      // Redirection si changement de mot de passe obligatoire
      if (json.token) {
        const decoded = parseJwt(json.token);
        setUser(decoded);
        setToken(json.token);
        localStorage.setItem("token", json.token);

        if (json.mustChangePassword) {
          router.replace("/change-password");
          return;
        }

        router.replace("/dashboard");
      }

    } catch (err) {
      console.error("Erreur login :", err);
      alert(
        err instanceof Error ? err.message : "Erreur de connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
      🔒 LOGOUT
  ========================== */
  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
