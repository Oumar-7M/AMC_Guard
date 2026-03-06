//src\hooks\usePermanencePrecise.ts
import { useAuth } from "@/context/AuthContext";
import { getPermanencePrecise } from "@/services/permanenceService";
import { PermanenceEnCour } from "@/types/permanence";
import { useEffect, useState } from "react";



export function usePermanencePrecise(date?: string, role?: string) {
const { token } = useAuth();

    const [permanence, setPermanence] = useState<PermanenceEnCour | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!token || !date) return;
  
      setTimeout(() => {
        setLoading(true);
      setError(null);
      }, 0);
      getPermanencePrecise(date, token, role)
      .then(setPermanence)
      .catch(() => setError("Erreur de chargement de la permanence"))
      .finally(() => setLoading(false));

  }, [date, role, token]);

  return { permanence, loading, error };
}