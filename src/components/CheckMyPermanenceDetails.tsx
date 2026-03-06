//src\components\CheckMyPermanenceDetails.tsx

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCheckMyPermanence } from "@/hooks/useCheckMyPermanence";

interface Props {
  matricule: string;
  date: string;
}

export default function CheckMyPermanenceDetails({
  matricule,
  date,
}: Props) {
  const router = useRouter();
  const { token } = useAuth();

  const { permanences, loading, error } =
    useCheckMyPermanence(matricule, token);

  const permanence = permanences.find(p => p.date === date);

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error || !permanence) {
    return (
      <div className="text-center text-red-500">
        Aucune donnée disponible pour cette permanence.
      </div>
    );
  }

  const membres = [
    { ...permanence.equipe.GrandJour, roleEquipe: "Grand-Jour" },
    { ...permanence.equipe.ChefRegiment, roleEquipe: "Chef-Régiment" },
    { ...permanence.equipe.ChefSection, roleEquipe: "Chef-Section" },
    ...permanence.equipe.Soldats.map((s) => ({
      ...s,
      roleEquipe: "Soldat",
    })),
  ];
  ;
  return (
    <section className="mt-8 bg-white shadow rounded-lg p-6 space-y-6">

          {/* EN-TETE */}
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b pb-4">
            <div>
              <p className="text-xs uppercase tracking-wider">
                Académie — Militaire — Cherchell</p>
              <h3 className="text-xl font-semibold">Permanence</h3>
              <p className="text-sm text-gray-500">
                Équipe : {permanence.equipe.nomEquipe}
              </p>
            </div>

            <span className="badge badge-neutral">
              {membres.length} participant(s)
            </span>
          </header>

          {/* INFOS PERMANENCE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
            <div className="space-y-1">
              <p><span className="font-semibold">Date :</span> {permanence.date}</p>
              <p><span className="font-semibold">Début :</span> {permanence.debut}</p>
              <p><span className="font-semibold">Fin :</span> {permanence.fin}</p>
            </div>

            <div className="space-y-1">
              <p><span className="font-semibold">Rôle :</span> {permanence.role}</p>
              <p><span className="font-semibold">Week-end :</span> {permanence.weekend ? "Oui" : "Non"}</p>
              
              {permanence.estTemporaire && (
                <>
                  <p><span className="font-semibold">NomRemplace :</span> {permanence.nomRemplace}</p>
                  <p><span className="font-semibold">estTemporaire :</span> {permanence.estTemporaire ? "Oui" : "Non"}</p>
                </>
              )}
              <p><span className="font-semibold">Équipe :</span> {permanence.equipe.nomEquipe}</p>
            </div>
          </div>

          {/* TABLEAU DESKTOP PREMIUM */}
          <div className="hidden md:block 
  overflow-x-auto 
  rounded-lg 
  border

  print:overflow-visible
  print:rounded-none
  print:border-none border-gray-200 shadow-sm">
            <table className="table table-zebra w-full min-w-225">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="text-left px-3 py-2">Nom</th>
                  <th className="text-left px-3 py-2">Prénom</th>
                  <th className="text-center px-3 py-2">Matricule</th>
                  <th className="text-left px-3 py-2">Arme</th>
                  <th className="text-left px-3 py-2">Grade</th>
                  <th className="text-left px-3 py-2">Fonction</th>
                  <th className="text-center px-3 py-2">Téléphone</th>
                  <th className="text-center px-3 py-2">Rôle équipe</th>
                </tr>
              </thead>

              <tbody>
                {membres.map(p => {

                  return (
                    <tr
                      key={`${p.Matricule}-${p.Id}-${p.roleEquipe}`
                      }
                      className="transition-colors duration-150 
                        hover:bg-gray-50 hover:shadow-sm"
                        
                    >
                      <td className="px-3 py-2">{p.Nom}</td>
                      <td className="px-3 py-2">{p.Prenom}</td>
                      <td className="px-3 py-2 text-center">
                        {p.Matricule}
                      </td>
                      <td className="px-3 py-2">{p.Arme}</td>
                      <td className="px-3 py-2">{p.grade}</td>
                      <td className="px-3 py-2">{p.Fonction}</td>
                      <td className="px-3 py-2 text-center">{p.numero}</td>
                      <td className="px-3 py-2 text-center">
                        <span className="badge badge-outline badge-sm px-2 py-1 text-xs">
                          {p.roleEquipe}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>



          {/* CARTES MOBILE */}
          <div className="md:hidden space-y-4">
            {membres.map(p => {

              return (
                <div
                  key={`${p.Matricule}-${p.Id}-${p.roleEquipe}`
                  }
                  className="rounded-lg border p-4 space-y-3 shadow-sm  bg-white
                    "
                >
                  {/* Header: Nom + badges */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <p className="font-semibold text-sm truncate sm:max-w-[60%]">
                      {p.Prenom} {p.Nom}
                    </p>

                    <div className="flex gap-2 flex-wrap mt-1 sm:mt-0">
                      
                      <span className="badge badge-outline badge-sm min-w-17.5 text-center whitespace-nowrap">
                        {p.roleEquipe}
                      </span>
                    </div>
                  </div>

                  {/* Infos détaillées */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    <div className="bg-gray-50 p-2 rounded">
                      <p><span className="font-semibold">Matricule:</span> {p.Matricule}</p>
                      <p><span className="font-semibold">Arme:</span> {p.Arme}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p><span className="font-semibold">Grade:</span> {p.grade}</p>
                      <p><span className="font-semibold">Fonction:</span> {p.Fonction}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded col-span-2">
                      <p>📞 {p.numero}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <button onClick={() => window.print()} className="btn btn-primary">
          Télécharger PDF
        </button>
        <button onClick={() => router.back()} className="btn btn-neutral">
          ← Retour
        </button>
      </div>
    </section>
  );
}
