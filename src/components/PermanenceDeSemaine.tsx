//src\components\PermanenceDeSemaine.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePermanenceSemaine } from "@/hooks/usePermanenceSemaine";
import PermanenceSemaineCard from "./PermanenceSemaineCard";
import DateSearchWithSubmit from "./user-interface/DateSearchWithSubmit";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function PermanenceDeSemaine() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dateFromUrl = searchParams.get("date");

  const [inputDate, setInputDate] = useState(dateFromUrl ?? "");

  // Synchronise le champ si on revient avec une URL déjà remplie
  useEffect(() => {
    if (dateFromUrl) {
      setTimeout(() => {
        setInputDate(dateFromUrl);
      }, 0);
    }
  }, [dateFromUrl]);

  const { permanence, loading, error } =
    usePermanenceSemaine(dateFromUrl ?? undefined);

  const affichageData = dateFromUrl ? permanence : null;
  const affichageError = dateFromUrl ? error : null;

  return (
    <section className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Permanence de la semaine
        </h1>
        <p className="text-sm text-base-content/70">
          Saisissez une date de début puis validez pour afficher la semaine correspondante.
        </p>
      </div>

      {/* ================= RECHERCHE ================= */}
      <div className="flex justify-start">
        <DateSearchWithSubmit
          value={inputDate}
          onChange={setInputDate}
          onSubmit={() => {
            if (inputDate) {
              router.push(
                `/dashboard/permanence-semaine?date=${inputDate}`
              );
            }
          }}
          loading={loading}
        />
      </div>

      {affichageError && <p className="text-red-500">{error}</p>}

      {/* ================= AVANT RECHERCHE ================= */}
      {!dateFromUrl && (
        <div className="border border-dashed rounded-2xl p-10 text-center text-base-content/60">
          <CalendarDaysIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Sélectionnez une date pour afficher les permanences.</p>
        </div>
      )}

      {/* ================= RESULTAT ================= */}
      {affichageData && (
        <div className="space-y-6">
          {/* Infos semaine */}
          <div className="bg-base-100 rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm">
              <p>
                <span className="font-semibold">Début :</span>{" "}
                {affichageData.debutPermanence}
              </p>
              <p>
                <span className="font-semibold">Fin :</span>{" "}
                {affichageData.finPermanence}
              </p>
            </div>

            <div className="badge badge-primary badge-outline">
              {affichageData.jours.length} jour
              {affichageData.jours.length > 1 ? "s" : ""}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                router.push(
                  `/dashboard/permanence-semaine/semaine-complete?date=${dateFromUrl}`
                )
              }
              className="btn btn-primary flex-1 rounded-2xl"
            >
              Voir la semaine complète
            </button>

            <button
              onClick={() =>
                router.push(
                  `/dashboard/permanence-semaine/personnels-semaine?date=${dateFromUrl}`
                )
              }
              className="btn btn-outline btn-primary flex-1 rounded-2xl"
            >
              Voir le personnel
            </button>
          </div>

          {/* Liste des jours */}
          <div className="space-y-4">
            {affichageData.jours.map((jour) => (
              <PermanenceSemaineCard
                key={jour.date}
                jour={jour}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
