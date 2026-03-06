//src/components/CheckMyPermanence.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import CheckMyPermanenceCard from "./CheckMyPermanenceCard";
import { useCheckMyPermanence } from "@/hooks/useCheckMyPermanence";
import SearchToggle from "./user-interface/SearchToggle";

export default function CheckMyPermanence() {
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const matriculeFromUrl = searchParams.get("matricule");

  const [inputMatricule, setInputMatricule] = useState(
    matriculeFromUrl ?? ""
  );

  // Synchronise le champ si on revient avec URL remplie
  useEffect(() => {
    if (matriculeFromUrl) {
      setTimeout(() => {
        setInputMatricule(matriculeFromUrl);
      }, 0);
    }
  }, [matriculeFromUrl]);

  const { permanences, loading, error } =
    useCheckMyPermanence(matriculeFromUrl ?? undefined, token);

  const handleValidate = () => {
    const value = inputMatricule.trim();

    if (!value) {
      router.push("/dashboard/check-my-permanence");
      return;
    }

    router.push(
      `/dashboard/check-my-permanence?matricule=${value}`
    );
  };

  return (
    <div className="space-y-4 max-w-5xl">
      <h2 className="text-lg font-semibold border-b pb-1">
        Permanences d’un matricule
      </h2>

      <SearchToggle
        placeholder="Entrer un matricule"
        onSearch={setInputMatricule}
        initialValue={inputMatricule}
        className="justify-end"
      />

      <button
        onClick={handleValidate}
        disabled={!inputMatricule.trim() || loading}
        className="btn btn-primary btn-sm"
      >
        {loading ? "Recherche..." : "Valider"}
      </button>

      {/* RESULTATS */}
      {permanences.length > 0 && (
        <section className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {permanences.length} permanence(s) trouvée(s)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {permanences.map((p) => (
              <CheckMyPermanenceCard key={p.date} permanence={p} matricule={matriculeFromUrl!}/>
            ))}
          </div>
        </section>
      )}

      {/* AUCUN RESULTAT */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
