//src/hooks/usePermanenceSemaine.ts
"use client";

import { useEffect, useState } from "react";
import { PermanenceSemaine } from "@/types/permanence";
import { getPermanenceSemaine } from "@/services/permanenceService";
import { useAuth } from "@/context/AuthContext";

export function usePermanenceSemaine(date?: string) {
  const { token } = useAuth();

  const [permanence, setPermanence] = useState<PermanenceSemaine | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !date) return;

    setTimeout(() => {
      setLoading(true);
    setError(null);
    }, 0);

    getPermanenceSemaine(date, token)
      .then(res => {
        setPermanence(res);
      })
      .catch(() =>
        setError("Erreur de chargement des permanences de la semaine : aucune semaine n'a cette date de début")
      )
      .finally(() => setLoading(false));
  }, [date, token]);

  return { permanence, loading, error };
} 