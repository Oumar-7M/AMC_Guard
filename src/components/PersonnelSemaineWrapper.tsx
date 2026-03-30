// src/components/PersonnelSemaineWrapper.tsx
"use client";

import { useState } from "react";
import { usePermanenceSemaine } from "@/hooks/usePermanenceSemaine";
import PersonnelSemaine from "./PersonnelSemaine";
import { grouperPersonnelsParGradeGlobal } from "@/utils/personnelPermanence";

interface WrapperProps {
  date?: string;
}

export default function PersonnelSemaineWrapper({ date }: WrapperProps) {
  const { permanence, loading, error } = usePermanenceSemaine(date);
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!permanence) return <p>Aucune donnée pour cette date.</p>;

  const personnelsParGrade = grouperPersonnelsParGradeGlobal(permanence);

  return (
    <PersonnelSemaine
      personnelsParGrade={personnelsParGrade}
      semaine={permanence.debutPermanence}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
  );
}