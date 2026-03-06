// src/app/change-password/ChangePasswordForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/services/api";

export default function ChangePasswordForm() {
  const { isLoggedIn, token, logout} = useAuth();
  const router = useRouter();

  const [userID, setUserID] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const url = isLoggedIn
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/changer-password`
  : `${process.env.NEXT_PUBLIC_API_URL}/api/auth/changer-password-non-connecter`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
  
    setLoading(true);
  
    try {
      const payload = isLoggedIn
        ? { oldPassword, newPassword: password }
        : { userID, newPassword: password };
  
      let res: Response;
  
      if (isLoggedIn) {
        if (!token) throw new Error("Token manquant");
        res = await authFetch(url, token, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
  
      if (!res.ok) {
        throw new Error("Erreur serveur");
      }
  await logout();
router.replace("/sign-in");

    } catch (err) {
      alert("Erreur lors du changement de mot de passe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded-xl shadow-md w-96 space-y-4">
      <h1 className="text-xl font-bold text-center">Changer le mot de passe</h1>

      {!isLoggedIn && (
        <input
          placeholder="ID utilisateur"
          className="input input-bordered w-full"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
      )}

      {isLoggedIn && (
        <input
          type="password"
          placeholder="Ancien mot de passe"
          className="input input-bordered w-full"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      )}

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        className="input input-bordered w-full"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />

      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Enregistrement..." : "Valider"}
      </button>
    </form>
  );
}
