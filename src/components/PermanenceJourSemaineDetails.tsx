//src\components\PermanenceJourSemaineDetails.tsx
"use client";

import { usePermanenceSemaine } from "@/hooks/usePermanenceSemaine";
import { formatDateFR } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

interface Props {
  date: string;
  semaineDate?: string;
}

export default function PermanenceJourSemaineDetails({
  date,
  semaineDate
}: Props) {

  const router = useRouter();
  const { permanence, loading, error } = 
    usePermanenceSemaine(semaineDate);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!permanence) return <p>Aucune donnée.</p>;

  const jour = permanence.jours.find(j => j.date === date);
  if (!jour) return <p>Aucune permanence ce jour.</p>;
  const membres = [
    jour.equipe.GrandSemaine,
    jour.equipe.GrandJour,
    jour.equipe.ChefRegiment,
    jour.equipe.ChefSection,
    ...jour.equipe.Soldats,
  ];
  const hasTemporaire = membres.some(p => p.estTemporaire);
  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-wider">
          Académie — Militaire — Cherchell
        </p>
      <h1 className="text-2xl font-bold">
        Permanence du {formatDateFR(jour.date)}
      </h1>

      <p className="text-sm text-gray-600">
          Équipe : <span className="font-medium">{jour.equipe.nomEquipe}</span>
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="badge badge-neutral">
            {membres.length} participant(s)
          </span>
        </div>
      </header>

      {/* ================= INFOS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
        <div className="space-y-1">
          <p className="font-semibold">Description :</p>
          <p className="text-gray-600">
            {jour.equipe.Description || "—"}
          </p>
        </div>
      </div>

      {/* ================= TABLE DESKTOP ================= */}
      <div className="hidden md:block 
  overflow-x-auto 
  rounded-lg 
  border

  print:overflow-visible
  print:rounded-none
  print:border-none">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
            <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Grade</th>
              <th>Fonction</th>
              <th>Arme</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Jour</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Weekend</th>
              {hasTemporaire && (
                <>
                  <th>nomDuRemplace</th>
                  <th>prenomDuRemplace</th>
                  <th>matriculeDuRemplace</th>
                  <th>Temporaire</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {membres.map(p => (
              <tr key={`${p.personnel.Matricule}-${p.personnel.Id}`}>
                <td className="font-medium">{p.personnel.Nom}</td>
                <td>{p.personnel.Prenom}</td>
                <td>{p.personnel.Matricule}</td>
                <td>{p.personnel.grade}</td>
                <td>{p.personnel.Fonction}</td>
                <td>{p.personnel.Arme}</td>
                <td>{p.personnel.numero}</td>
                <td>
                  <span className="badge badge-info badge-sm">{p.role}</span>
                </td>
                <td>{p.jourSemaine}</td>
                <td>{formatDateFR(p.DateDebut)}</td>
                <td>{formatDateFR(p.DateFin)}</td>
                <td>
                  {p.estWeekend ? (
                    <span className="badge badge-warning badge-sm">Oui</span>
                  ) : (
                    <span className="badge badge-ghost badge-sm">Non</span>
                  )}
                </td>
                {hasTemporaire && (
                  <>
                    <td>{p.nomDuRemplace}</td>
                    <td>{p.prenomDuRemplace}</td>
                    <td>{p.matriculeDuRemplace}</td>
                    <td>
                      {p.estTemporaire ? (
                        <span className="badge badge-warning badge-sm">Oui</span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">Non</span>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-3">
        {membres.map(p => (
          <div
            key={p.personnel.Id}
            className="rounded-xl border p-3 bg-white shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">
                {p.personnel.Prenom} {p.personnel.Nom}
              </p>
              <span className="badge badge-info badge-sm">{p.role}</span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
            <span>Matricule: {p.personnel.Matricule}</span>
              <span>Grade: {p.personnel.grade}</span>
              <span>Fonction: {p.personnel.Fonction}</span>
              <span>Arme: {p.personnel.Arme}</span>
              <span>Tél: {p.personnel.numero}</span>
              <span>Jour: {p.jourSemaine}</span>
              <span>Début: {formatDateFR(p.DateDebut)}</span>
              <span>Fin: {formatDateFR(p.DateFin)}</span>
              <span>
                Weekend:{" "}
                {p.estWeekend ? "Oui" : "Non"}
              </span>
              {p.estTemporaire && (
                <>
                  <span>Remplace Nom: {p.nomDuRemplace}</span>
                  <span>Remplace Prénom: {p.prenomDuRemplace}</span>
                  <span>Remplace Matricule: {p.matriculeDuRemplace}</span>
                  <span className="font-medium text-orange-600">
                    Temporaire: Oui
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={() => window.print()} className="btn btn-primary">
          Télécharger PDF
        </button>

      <button
        onClick={() => router.back()}
        className="btn btn-neutral"
      >
        ← Retour
      </button>
      </div>
    </section>
  );
}