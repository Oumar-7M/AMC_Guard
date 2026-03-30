//src\components\SemaineComplete.tsx
"use client";

import { useState } from "react";
import { usePermanenceSemaine } from "@/hooks/usePermanenceSemaine";
import SemaineCompleteCard from "./SemaineCompleteCard";
import PdfSignature from "./PdfSignature";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateFR } from "@/utils/formatDate";

interface Props {
  date?: string;
}

export default function SemaineComplete({ date }: Props) {

  const { permanence, loading, error } = usePermanenceSemaine(date);

  const [mode, setMode] = useState<"officiel" | "signature">("officiel");
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrint = (type: "officiel" | "signature") => {
    setMode(type);

    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!permanence) return <p>Aucune donnée.</p>;

  const jours = permanence.jours;

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
        Semaine du {formatDateFR(permanence.debutPermanence)} au {formatDateFR(permanence.finPermanence)}
        </p>
      </div>

      {/* BOUTONS PDF */}
      <div className="flex justify-end gap-2 print:hidden mb-6">

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
          PDF signatures
        </button>

      </div>

      {/* CONTENU */}

      {/* MODE NORMAL */}
      <div className="print:hidden">

        <AnimatePresence mode="wait">

          <motion.div
            key={jours[activeIndex].date}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >

            <SemaineCompleteCard
              jour={jours[activeIndex]}
              mode={mode}
            />

          </motion.div>

        </AnimatePresence>

      </div>

      {/* MODE PRINT → toute la semaine */}
      <div className="hidden print:block">

        {jours.map((jour) => (
          <SemaineCompleteCard
            key={jour.date}
            jour={jour}
            mode={mode}
          />
        ))}

        {/* SIGNATURE UNIQUEMENT PDF */}
        {mode === "officiel" && (
          <div className="mt-16">
            <PdfSignature titre="Le Chef de l'Académie" />
          </div>
        )}

      </div>

      {/* PAGINATION EN BAS */}
      <div className="flex justify-center mt-8 gap-2 print:hidden">

        {jours.map((jour, index) => (

          <button
            key={jour.date}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition
            ${
              activeIndex === index
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {index + 1}
          </button>

        ))}

      </div>

    </div>
  );
}