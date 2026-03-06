//src/components/PermanenceCourante.tsx
"use client";

import { usePermanenceCourante } from "@/hooks/usePermanenceCourante";
import PermanenceCard from "./PermanenceCard";

export default function PermanenceCourante() {
  const { permanence, loading, error } = usePermanenceCourante();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!permanence) return <p>Aucune permanence aujourd’hui.</p>;

  return <PermanenceCard permanence={permanence} />;
}
