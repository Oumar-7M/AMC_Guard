//src\components\PermanencePrecise.tsx
"use client";

import { usePermanencePrecise } from "@/hooks/usePermanencePrecise";
import { useEffect, useState } from "react";
import DateRoleSearch from "./user-interface/DateRoleSearch";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import PermanenceCard from "./PermanenceCard";

export default function PermanencePrecise() {

  const [inputDate, setInputDate] = useState("");
  const [inputRole, setInputRole] = useState("");

  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [searchRole, setSearchRole] = useState<string | null>(null);

  const { permanence, loading, error } = usePermanencePrecise(
    searchDate ?? undefined,
    searchRole ?? undefined
  );

  useEffect(() => {
    if (inputDate === "") {
      setTimeout(() => {
        setSearchDate(null);
        setSearchRole(null);
      }, 0);
    }
  }, [inputDate]);

  const affichageData = !searchDate ? null : permanence;
  const affichageError = !searchDate ? null : error;

  const handleSubmit = () => {
    setSearchDate(inputDate);
    setSearchRole(inputRole || null);
  };

  return (
    <section className="space-y-6">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Permanence Précise
        </h1>

        <p className="text-sm text-base-content/70">
        Rechercher une permanence par date ou filtrez par rôle.
        </p>
      </div>

      {/* SEARCH */}
      <DateRoleSearch
        date={inputDate}
        role={inputRole}
        onDateChange={setInputDate}
        onRoleChange={setInputRole}
        onSubmit={handleSubmit}
        loading={loading}
      />

{affichageError && (
  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
    {affichageError}
  </div>
)}

      {/* AVANT RECHERCHE */}
      {!searchDate && (
        <div className="border border-dashed rounded-2xl p-10 text-center text-base-content/60">
          <CalendarDaysIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Sélectionnez une date pour afficher la permanence, ou ajoutez un rôle pour cibler une personne précise.</p>
        </div>
      )}

      {/* RESULTAT */}
      {affichageData && (
        <PermanenceCard permanence={affichageData} />
      )}

    </section>
  );
}

