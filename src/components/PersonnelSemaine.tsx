// src/components/PersonnelSemaine.tsx
"use client";

import { getGradeOrder } from "@/utils/personnelPermanence";
import PdfSignature from "./PdfSignature";
import { formatDateFR } from "@/utils/formatDate";
import { AnimatePresence, motion } from "framer-motion";

interface PersonnelEtInfo {
  grade: string;
  Nom: string;
  Prenom: string;
  Matricule: string;
  Arme: string;
  Fonction: string;
  numero: string;
  dates: {
    debut: string;
    fin: string;
  }[];
}

interface PersonnelParGradeEtInfo {
  [grade: string]: PersonnelEtInfo[];
}

interface Props {
  personnelsParGrade: PersonnelParGradeEtInfo;
  semaine: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function PersonnelSemaine({
  personnelsParGrade,
  semaine,
  activeIndex,
  setActiveIndex,
}: Props) {
  const grades = Object.keys(personnelsParGrade).sort(
    (a, b) => getGradeOrder(a) - getGradeOrder(b)
  );

  const currentGrade = grades[activeIndex];
  const currentData = personnelsParGrade[currentGrade] ?? [];

  // 🔥 IMPORTANT : snapshot fixe pour le PDF
  const printGrades = [...grades]; // copie stable
  const safeIndex = Math.min(activeIndex, grades.length - 1);
  const mobileGrade = grades[safeIndex];
  const mobileData = personnelsParGrade[mobileGrade] ?? [];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-slate-50 print:bg-white print:p-4 font-sans">
      {/* HEADER (identique screen + print) */}
      <div className="text-center mb-8 print:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 print:text-black">
          Académie Militaire de Cherchell
        </p>
        <h1 className="text-2xl print:text-xl font-black mt-2 uppercase tracking-wide text-slate-900 print:text-black">
          Liste des personnels de permanence
        </h1>
        <div className="inline-block mt-3 px-4 py-1 bg-slate-200 print:bg-transparent print:border print:border-black rounded-md text-sm font-medium">
          Semaine du {formatDateFR(semaine)}
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end mb-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-sm"
        >
          Imprimer / PDF
        </button>
      </div>

      {/* ================= DESKTOP SCREEN ONLY ================= */}
      {/* Ajout de 'hidden md:block' pour cacher ce grand tableau sur mobile */}
      <div className="hidden md:block print:!hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <GradeTable grade={currentGrade} personnes={currentData} />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {grades.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-3 py-1 border rounded transition-colors ${i === activeIndex
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-slate-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRINT ONLY (FIXE, INDEPENDANT) ================= */}
      <div className="hidden print:block">
        {printGrades.map((grade) => (
          <GradeTable
            key={grade}
            grade={grade}
            personnes={personnelsParGrade[grade]}
          />
        ))}

        <div className="break-before-page pt-16">
          <PdfSignature titre="Le Chef de l'Académie" />
        </div>
      </div>

      {/* ================= VERSION MOBILE ONLY (cartes avec pagination) ================= */}
      {/* Ajout de 'print:hidden' pour empêcher cette vue de s'imprimer */}
      <div className="md:hidden print:!hidden space-y-6">
        <div
          key={mobileGrade}
          className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
        >
          <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="font-bold text-sm uppercase tracking-wider">
              {mobileGrade}
            </h2>

            <span className="bg-white text-slate-800 text-xs px-2 py-1 rounded-full font-bold">
              {mobileData.length} pers.
            </span>
          </div>

          <div className="p-2 space-y-2 bg-slate-50">
            {mobileData.map((p) => (
              <div
                key={p.Matricule}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-lg text-slate-800 uppercase">
                      {p.Nom}{" "}
                      <span className="capitalize font-medium text-slate-600">
                        {p.Prenom}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.Fonction}
                    </p>
                  </div>

                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-mono font-bold border">
                    #{p.Matricule}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3 border-y py-2 mt-2">
                  <p>
                    <span className="font-semibold block text-xs uppercase text-slate-400">
                      Arme
                    </span>
                    {p.Arme}
                  </p>

                  <p>
                    <span className="font-semibold block text-xs uppercase text-slate-400">
                      Téléphone
                    </span>
                    {p.numero}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-xs font-mono">
                  {p.dates.map((d, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                        {formatDateFR(d.debut)}
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100">
                        {formatDateFR(d.fin)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* navigation mobile */}
          <div className="flex justify-center gap-2 p-4 bg-white border-t border-slate-200">
            <button
              onClick={() =>
                setActiveIndex(activeIndex > 0 ? activeIndex - 1 : grades.length - 1)
              }
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Précédent
            </button>

            <button
              onClick={() =>
                setActiveIndex(
                  activeIndex < grades.length - 1 ? activeIndex + 1 : 0
                )
              }
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant interne pour réutiliser le tableau
function GradeTable({ grade, personnes }: { grade: string; personnes: PersonnelEtInfo[] }) {
  return (
    <div className="w-full page-break-inside-avoid print:mb-6">
      <table className="w-full border-collapse border-2 border-slate-800 print:border-black bg-white">
        <thead>
          <tr className="bg-slate-800 print:bg-gray-200 text-white print:text-black">
            <th colSpan={8} className="px-4 py-2 border-b-2 border-slate-800 print:border-black">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider text-sm print:text-[13px]">{grade}</span>
                <span className="bg-white print:bg-white text-slate-800 text-[11px] px-3 py-0.5 rounded-full font-bold shadow-sm print:border print:border-black">
                  {personnes.length}
                </span>
              </div>
            </th>
          </tr>
          <tr className="bg-slate-100 print:bg-gray-50 text-slate-800 print:text-black text-xs print:text-[11px] uppercase tracking-wide">
            <th className="border border-slate-300 print:border-black px-3 py-2 text-left font-semibold w-[12%]">Nom</th>
            <th className="border border-slate-300 print:border-black px-3 py-2 text-left font-semibold w-[12%]">Prénom</th>
            <th className="border border-slate-300 print:border-black px-3 py-2 text-center font-semibold w-[8%]">Matricule</th>
            <th className="border border-slate-300 print:border-black px-3 py-2 text-center font-semibold w-[8%]">Arme</th>
            <th className="border border-slate-300 print:border-black px-3 py-2 text-left font-semibold w-[20%]">Fonction</th>
            <th className="border border-slate-300 print:border-black px-3 py-2 text-center font-semibold w-[10%]">Téléphone</th>
            <th className="border border-slate-300 print:border-black px-3 py-2 text-center font-semibold w-[15%]">Horaires</th>
          </tr>
        </thead>
        <tbody className="text-sm print:text-[11px] text-slate-700 print:text-black">
          {personnes.map((p, index) => (
            <tr
              key={p.Matricule}
              className={`hover:bg-slate-50 transition-colors print:break-inside-avoid ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50 print:bg-transparent"
                }`}
            >
              <td className="border border-slate-300 print:border-black px-3 py-2 font-bold uppercase">{p.Nom}</td>
              <td className="border border-slate-300 print:border-black px-3 py-2 capitalize">{p.Prenom}</td>
              <td className="border border-slate-300 print:border-black px-3 py-2 text-center font-mono">{p.Matricule}</td>
              <td className="border border-slate-300 print:border-black px-3 py-2 text-center font-medium">{p.Arme}</td>
              <td className="border border-slate-300 print:border-black px-3 py-2 text-xs">{p.Fonction}</td>
              <td className="border border-slate-300 print:border-black px-3 py-2 text-center font-mono tracking-tight">{p.numero}</td>
              <td className="border border-slate-300 print:border-black px-3 py-2 text-center font-mono">
  <div className="flex flex-wrap justify-center gap-2">
    {p.dates.map((d, i) => (
      <span
        key={i}
        className="text-[11px] px-2 py-0.5 font-bold whitespace-nowrap"
      >
        {formatDateFR(d.debut)} → {formatDateFR(d.fin)}
      </span>
    ))}
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}