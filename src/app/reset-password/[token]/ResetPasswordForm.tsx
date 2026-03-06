//src/app/reset-password/[token]/ResetPasswordForm.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const router = useRouter();

  // 🔥 Vérification du token
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${token}`
        );
        if (!res.ok) throw new Error();
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (!res.ok) throw new Error();

      alert("Mot de passe réinitialisé !");
      router.replace("/sign-in");
    } catch {
      alert("Erreur lors de la réinitialisation");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ chargement
  if (tokenValid === null) {
    return <p>Vérification du lien...</p>;
  }

  // ❌ token invalide
  if (!tokenValid) {
    return <p className="text-error">Lien invalide ou expiré.</p>;
  }

  // ✅ token valide
  return (
    <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded-xl shadow-md w-96 space-y-4">
      <h1 className="text-xl font-bold text-center">Nouveau mot de passe</h1>

      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Confirmer le mot de passe"
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
