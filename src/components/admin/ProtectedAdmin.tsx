"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedAdminProps {
  children: ReactNode;
}

export default function ProtectedAdmin({ children }: ProtectedAdminProps) {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const router = useRouter();

  // Redirection automatique
  useEffect(() => {
    if (!loading && (!isLoggedIn || !isAdmin)) {
      router.replace("/dashboard"); // si pas admin ou pas connecté → dashboard
    }
  }, [loading, isLoggedIn, isAdmin, router]);

  // Affichage pendant vérification ou si non autorisé
  if (loading || !isLoggedIn || !isAdmin) {
    return (
      <p className="text-center mt-10">
        Vérification des autorisations...
      </p>
    );
  }

  // Admin autorisé → affiche le contenu
  return <>{children}</>;
}
