//src/components/ProfilCard.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { getProfil } from "@/services/profilService";
import type { Profil as ProfilType } from "@/types/profil";
import {
  ArrowRightOnRectangleIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilCard() {
  const { logout, token } = useAuth();
  const [profil, setProfil] = useState<ProfilType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getProfil(token)
      .then(setProfil)
      .catch(() => setError("Impossible de charger le profil"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !profil) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-base-200">
      {/* HEADER FULL WIDTH */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center">
            <UserIcon className="w-14 h-14" />
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">
              {profil.prenom} {profil.nom}
            </h1>
            <p className="opacity-80 text-lg">{profil.username}</p>
          </div>
        </div>
      </div>

      {/* CONTENT FULL PAGE */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* INFOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 rounded-2xl p-6 shadow">
            <p className="text-sm text-base-content/60">Prénom</p>
            <p className="text-lg font-semibold">{profil.prenom}</p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow">
            <p className="text-sm text-base-content/60">Nom</p>
            <p className="text-lg font-semibold">{profil.nom}</p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow">
            <p className="text-sm text-base-content/60">Nom d’utilisateur</p>
            <p className="text-lg font-semibold">@{profil.username}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/change-password"
            className="btn btn-outline flex-1 flex items-center gap-2"
          >
            <KeyIcon className="w-5 h-5" />
            Changer le mot de passe
          </Link>

          <button
            onClick={logout}
            className="btn flex-1 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Déconnexion
          </button>
          
        </div>
      </div>
    </div>
  );
}
