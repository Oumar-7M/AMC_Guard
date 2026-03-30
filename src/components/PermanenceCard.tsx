//src/components/PermanenceCouranteCard.tsx
"use client";

import { PermanenceEnCour } from "@/types/permanence";
import { formatDateFR } from "@/utils/formatDate";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

type Props = {
  permanence: PermanenceEnCour;
};

export default function PermanenceCard({ permanence }: Props) {

  const membres = permanence
  ? [
      permanence.jours.equipe.GrandSemaine,
      permanence.jours.equipe.GrandJour,
      permanence.jours.equipe.ChefRegiment,
      permanence.jours.equipe.ChefSection,
      ...permanence.jours.equipe.Soldats,
    ].filter(Boolean) // 👈 supprime null / undefined
  : [];

  const hasTemporaire = membres.some(p => p.estTemporaire);

  return (
    <section className="
  w-full 
  mt-6 
  bg-white 
  shadow-lg 
  rounded-xl 
  p-4 md:p-6 
  space-y-6

  print:shadow-none
  print:rounded-none
  print:p-0
  print:mt-0
">

      {/* ================= HEADER ================= */}
      <header className="relative border-b pb-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
          <p className="text-xs uppercase tracking-wider">
          Académie — Militaire — Cherchell
        </p>
            <h2 className="text-xl font-bold">Permanence Courante</h2>
            <p className="text-sm text-gray-500">
              Équipe : <span className="font-medium">{permanence.jours.equipe.nomEquipe}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">

            <span className="badge badge-outline"><CalendarDaysIcon className="w-5 h-5 text-primary" />
            {formatDateFR(permanence.jours.date)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="badge badge-neutral">
            {membres.length} participant(s)
          </span>
        </div>
      </header>

      {/* ================= INFOS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
        <div className="space-y-1">
          <p><span className="font-semibold">Début :</span> {formatDateFR(permanence.DebutPermanence)}</p>
          <p><span className="font-semibold">Fin :</span> {formatDateFR(permanence.FinPermanence)}</p>
        </div>
        <div className="space-y-1">
          <p><span className="font-semibold">Description :</span></p>
          <p className="text-gray-600">
            {permanence.jours.equipe.Description || "—"}
          </p>
        </div>
      </div>

      {/* ================= TABLE DESKTOP ================= */}
      <div className="
  hidden md:block 
  overflow-x-auto 
  rounded-lg 
  border

  print:overflow-visible
  print:rounded-none
  print:border-none
">
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
            key={`${p.personnel.Matricule}-${p.personnel.Id}`}
            className="rounded-lg border p-3 bg-white shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">
                {p.personnel.Prenom} {p.personnel.Nom}
              </p>
              <span className="badge badge-info badge-sm">{p.role}</span>
            </div>

            <div className="text-xs text-gray-600 grid grid-cols-2 gap-x-3 gap-y-1">
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

      {/* ================= ACTION ================= */}
      <div className="flex justify-end">
        <button
          className="btn btn-primary print:hidden"
          onClick={() => window.print()}
        >
          Télécharger PDF
        </button>
      </div>
    </section>
  );
}
