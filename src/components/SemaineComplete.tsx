//src\components\SemaineComplete.tsx
"use client";

import { useState } from "react";
import { usePermanenceSemaine } from "@/hooks/usePermanenceSemaine";
import SemaineCompleteCard from "./SemaineCompleteCard";
import PdfSignature from "./PdfSignature";

interface Props {
  date?: string;
}

export default function SemaineComplete({ date }: Props) {

  const { permanence, loading, error } = usePermanenceSemaine(date);
  const [mode, setMode] = useState<"officiel" | "signature">("officiel");

  const handlePrint = (type: "officiel" | "signature") => {
    setMode(type);

    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!permanence) return <p>Aucune donnée.</p>;

  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="text-center mb-6 print:mb-8">
        <p className="text-xs uppercase tracking-wider">
          Académie — Militaire — Cherchell
        </p>

        <h1 className="text-2xl font-bold mt-2 uppercase">
          Liste des permanences de la Semaine
        </h1>

        <p className="text-sm mt-1">
          Semaine du {permanence.debutPermanence} au {permanence.finPermanence}
        </p>
      </div>

      {/* BOUTONS PDF */}
      <div className="flex justify-end gap-2 print:hidden mb-4">

        <button
          onClick={() => handlePrint("officiel")}
          className="btn btn-primary"
        >
          PDF officiel
        </button>

        <button
          onClick={() => handlePrint("signature")}
          className="btn btn-secondary"
        >
          PDF avec signatures
        </button>

      </div>

      {/* CONTENU */}
      <div className="space-y-6">
        {permanence.jours.map((jour) => (
          <SemaineCompleteCard
            key={jour.date}
            jour={jour}
            mode={mode}
          />
        ))}
      </div>

      {/* SIGNATURE CHEF (SEULEMENT PDF OFFICIEL) */}
      {mode === "officiel" && (
        <PdfSignature titre="Le Chef de l'Académie" />
      )}

    </div>
  );
}