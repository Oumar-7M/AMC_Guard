//src/app/sign-in/SignInForm.tsx
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoginFormData } from "@/types/loginFormData";
import Link from "next/link";

export default function SignInForm() {
  const { login, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  // Si déjà connecté, on redirige
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(formData);
    // Optionnel : vider le formulaire après soumission
    setFormData({ username: "", password: "" });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 p-6 rounded-xl shadow-md w-96 space-y-4">
      <h1 className="text-2xl font-bold text-center">Connexion</h1>

      <input
        type="text"
        placeholder="Nom d'utilisateur"
        className="input input-bordered w-full"
        value={formData.username}
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        required
      />
      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>



      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}



