//src/app/forgot-password/ForgotPasswordForm.tsx
"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Erreur lors de la demande de réinitialisation");

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la demande de réinitialisation");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <p className="text-center mt-4">Un e-mail de réinitialisation a été envoyé.</p>;
  }

  return (
    <form
      className="bg-base-100 p-6 rounded-xl shadow-md w-96 space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-bold text-center">Mot de passe oublié</h1>

      <input
        type="email"
        placeholder="Adresse e-mail"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer le lien"}
      </button>
    </form>
  );
}
