//src\components\admin\Convocation.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CalendarDaysIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useConvocationPermanence } from "@/hooks/useConvocationPermanence";
import DateSearchWithSubmit from "../user-interface/DateSearchWithSubmit";
import ConvocationCard from "./ConvocationCard";
import PdfSignature from "../PdfSignature";

export default function Convocation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dateFromUrl = searchParams.get("date");
  const [inputDate, setInputDate] = useState(dateFromUrl ?? "");

  useEffect(() => {
    if (dateFromUrl) {
      setTimeout(() => {
        setInputDate(dateFromUrl);
      }, 0);
    }
  }, [dateFromUrl]);

  const { convocations, loading, error } =
    useConvocationPermanence(dateFromUrl ?? undefined);

  const affichageData = dateFromUrl ? convocations : null;
  const affichageError = dateFromUrl ? error : null;

  return (
    <section className="space-y-8 bg-base-50 p-2 md:p-6 rounded-2xl min-h-screen">
      
      {/* SECTION HAUT (Cachée à l'impression) */}
      <div className="print:hidden space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
            Convocations de la semaine
          </h1>
          <p className="text-sm md:text-base text-base-content/70">
            Saisissez une date pour générer et imprimer les convocations de permanence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
          <DateSearchWithSubmit
            value={inputDate}
            onChange={setInputDate}
            onSubmit={() => {
              if (inputDate) {
                router.push(`/admin/convocations?date=${inputDate}`);
              }
            }}
            loading={loading}
          />

          {affichageData && (
            <button
              onClick={() => window.print()}
              className="btn btn-primary w-full sm:w-auto gap-2"
            >
              <PrinterIcon className="w-5 h-5" />
              Imprimer / PDF
            </button>
          )}
        </div>
      </div>

      {affichageError && (
        <div className="alert alert-error shadow-sm print:hidden">
          <span>{affichageError}</span>
        </div>
      )}

      {/* AVANT RECHERCHE */}
      {!dateFromUrl && !loading && (
        <div className="border-2 border-dashed border-base-300 bg-base-100/50 rounded-2xl p-16 text-center text-base-content/60 print:hidden transition-all hover:bg-base-100">
          <CalendarDaysIcon className="w-16 h-16 mx-auto mb-4 opacity-40 text-primary" />
          <h3 className="text-lg font-medium text-base-content">Aucune date sélectionnée</h3>
          <p className="mt-1">Veuillez choisir une date ci-dessus pour afficher les convocations.</p>
        </div>
      )}

      {/* CHARGEMENT */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-20 space-y-4 print:hidden">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60 animate-pulse">Génération des convocations...</p>
        </div>
      )}

      {/* RESULTATS (Zone d'impression) */}
      {affichageData && !loading && (
        <div className="bg-white md:p-10 rounded-2xl md:shadow-sm md:border border-base-200 print:shadow-none print:border-none print:p-0">
          
          {/* HEADER PDF */}
          <div className="text-center mb-8 print:mb-12">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-base-content/70 print:text-black">
              Académie — Militaire — Cherchell
            </p>
            <div className="divider mx-auto w-24 my-2 print:border-black"></div>
            <h2 className="text-2xl print:text-3xl font-bold uppercase text-base-content print:text-black">
              Convocations de permanence
            </h2>
            <p className="text-sm md:text-base mt-2 text-base-content/80 print:text-black">
              Semaine débutant le <span className="font-semibold">{dateFromUrl}</span>
            </p>
          </div>

          {/* LISTE DES CONVOCATIONS */}
          <div className="space-y-6 print:space-y-8">
            {affichageData.message.map((msg, index) => (
              <ConvocationCard key={index} message={msg} />
            ))}
          </div>

          {/* SIGNATURE */}
          <div className="mt-12 print:mt-16">
            <PdfSignature titre="Le Chef de l'Académie" />
          </div>

        </div>
      )}
    </section>
  );
}