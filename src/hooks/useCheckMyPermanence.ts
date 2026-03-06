//src\hooks\useCheckMyPermanence.ts
"use client";

import { useEffect, useState } from "react";
import { PermanenceCheck } from "@/types/permanence";
import { checkUserPermanence } from "@/services/checkMyPermanenceService";

export function useCheckMyPermanence(
  matricule?: string,
  token?: string | null
) {
  const [permanences, setPermanences] = useState<PermanenceCheck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matricule || !token) return;

    setTimeout(() => {
      setLoading(true);
    setError(null);
    }, 0);

    checkUserPermanence(matricule, token)
      .then((res) => {
        setPermanences(res);
      })
      .catch(() => {
        setPermanences([]);
        setError("Aucune permanence trouvée pour ce matricule");
      })
      .finally(() => setLoading(false));
  }, [matricule, token]);

  return {
    permanences,
    loading,
    error,
  };
}
