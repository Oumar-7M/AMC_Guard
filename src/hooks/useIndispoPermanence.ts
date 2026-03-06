//src\hooks\useIndispoPermanence.ts
"use client";

import { useAuth } from "@/context/AuthContext";
import { getIndispoPermanence } from "@/services/permanenceService";
import { PersonnelIndispo } from "@/types/personnel";
import { useEffect, useState } from "react";

export default function useIndispoPermanence() {
    const {token} = useAuth();
    const [PersonnelIndispo, setPersonnelIndispo] = useState<PersonnelIndispo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getIndispoPermanence(token).then(setPersonnelIndispo).catch(() => setError("Erreur de chargement des Personnels Indisponibles")).finally(() => setLoading(false));
  }, [token]);

  return {PersonnelIndispo, loading, error} ;
}