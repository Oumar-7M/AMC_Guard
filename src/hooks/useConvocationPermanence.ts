"use client";

import { useEffect, useState } from "react";
import { getConvocationPermanence } from "@/services/permanenceService";
import { useAuth } from "@/context/AuthContext";
import { ConvocationType } from "@/types/convocationType";

export function useConvocationPermanence(date?: string) {
  const { token } = useAuth();

  const [convocations, setConvocations] = useState<ConvocationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !date) return;

    setTimeout(() => {
      setLoading(true);
    setError(null);
    }, 0);

    getConvocationPermanence(date, token)
      .then(res => {
        setConvocations(res);
      })
      .catch(() =>
        setError("Erreur de chargement des convocations de la semaine ")
      )
      .finally(() => setLoading(false));
  }, [date, token]);

  return { convocations, loading, error };
}