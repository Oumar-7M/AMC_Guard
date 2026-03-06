//src/hooks/usePermanenceCourante.ts
"use client";

import { useEffect, useState } from "react";
import {  PermanenceEnCour } from "@/types/permanence";
import { getPermanenceCourante } from "@/services/permanenceService";
import { useAuth } from "@/context/AuthContext";

export function usePermanenceCourante() {
  const { token } = useAuth();

  const [permanence, setPermanence] = useState<PermanenceEnCour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getPermanenceCourante(token).then(setPermanence).catch(() => setError("Erreur de chargement de la permanence")).finally(() => setLoading(false));
  }, [token]);
  return { permanence, loading, error };
}
