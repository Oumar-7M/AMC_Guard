//src\components\PersonnelSemaineWrapper.tsx
"use client";

import { usePermanenceSemaine } from "@/hooks/usePermanenceSemaine";
import PersonnelSemaine from "./PersonnelSemaine";
import { grouperPersonnelsParGradeGlobal } from "@/utils/personnelPermanence";

interface WrapperProps {
  date?: string;
}

export default function PersonnelSemaineWrapper({ date }: WrapperProps) {
  const { permanence, loading, error } = usePermanenceSemaine(date);
  
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!permanence) return <p>Aucune donnée pour cette date.</p>;

  const personnelsParGrade = grouperPersonnelsParGradeGlobal(permanence);

  return <PersonnelSemaine personnelsParGrade={personnelsParGrade} semaine={permanence.debutPermanence} />;
}
