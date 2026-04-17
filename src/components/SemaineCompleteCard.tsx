//src\components\SemaineCompleteCard.tsx
import { Jours } from "@/types/jours";
import { PersonnelPermCourante } from "@/types/personnel";
import { formatDateFR } from "@/utils/formatDate";

type Props = {
  jour: Jours;
  mode: "officiel" | "signature";
};

export default function SemaineCompleteCard({ jour, mode }: Props) {

  if (!jour) {
    return <p>Aucune permanence pour ce jour.</p>;
  }

  const membres = [
    jour.equipe.GrandSemaine,
    jour.equipe.GrandJour,
    jour.equipe.ChefRegiment,
    jour.equipe.ChefSection,
    ...jour.equipe.Soldats,
  ];

  const hasTemporaire = membres.some((p) => p.estTemporaire);
  
  const getDates = (p: PersonnelPermCourante) => {
    if (p.HeureTravail && p.HeureTravail.length > 0) {
      return p.HeureTravail.map((h) => ({
        debut: h.dateDebut,
        fin: h.dateFin,
        affiche: `${formatDateFR(h.dateDebut)} → ${formatDateFR(h.dateFin)}`,
      }));
    }

    return [
      {
        debut: p.DateDebut,
        fin: p.DateFin,
        affiche: `${formatDateFR(p.DateDebut)} → ${formatDateFR(p.DateFin)}`,
      },
    ];
  };

  return (
    <section
      className="
      space-y-6
      print:break-after-page
      print:break-inside-avoid
      "
    >
      <header>
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

      {/* INFO */}
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
        print:overflow-visible
        print:w-full
        rounded-lg
        border
        print:rounded-none
        print:border-none
        min-w-full">
        
        <table className="table table-zebra w-full text-sm print:text-[10px] print:w-full print:border-collapse">
          <colgroup>
            <col className="w-[140px]" />
            <col className="w-[140px]" />
            <col className="w-[130px]" />
            <col className="w-[100px]" />
            <col className="w-[150px]" />
            <col className="w-[110px]" />
            <col className="w-[130px]" />
            <col className="w-[120px]" />
            <col className="w-[90px]" />
            {/* ✅ Largeur ajustée pour la colonne Horaires */}
            <col className="w-[220px]" /> 
            <col className="w-[90px]" />
            <col className="w-[90px]" />

            {hasTemporaire && (
              <>
                <col className="w-[120px]" />
                <col className="w-[120px]" />
                <col className="w-[130px]" />
                <col className="w-[90px]" />
              </>
            )}

            {mode === "signature" && (
              <col className="w-[220px]" />
            )}
          </colgroup>

          <thead className="bg-gray-100 print:table-header-group">
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
              <th>Horaires</th>
              <th>Weekend</th>
              {hasTemporaire && (
                <>
                  <th>nomDuRemplace</th>
                  <th>prenomDuRemplace</th>
                  <th>matriculeDuRemplace</th>
                  <th>Temporaire</th>
                </>
              )}
              {mode === "signature" && (
                <th className="text-center">Signature</th>
              )}
            </tr>
          </thead>

          <tbody>
            {membres.map(p => (
              <tr key={`${p.personnel.Matricule}-${p.personnel.Id}`}>
                <td className="font-medium p-2 break-words whitespace-normal">{p.personnel.Nom}</td>
                <td className="p-2 break-words whitespace-normal">{p.personnel.Prenom}</td>
                <td className="p-2 break-words whitespace-normal">{p.personnel.Matricule}</td>
                <td className="p-2 break-words whitespace-normal">{p.personnel.grade}</td>
                <td className="p-2 break-words whitespace-normal">{p.personnel.Fonction}</td>
                <td className="p-2 break-words whitespace-normal">{p.personnel.Arme}</td>
                <td className="p-2 break-words whitespace-normal">{p.personnel.numero}</td>
                <td className="p-2 break-words whitespace-normal">
                  <span className="badge badge-info badge-sm">{p.role}</span>
                </td>
                <td className="p-2 break-words whitespace-normal">{p.jourSemaine}</td>
                
                {/* ✅ CORRECTION ICI : Affichage identique à PermanenceJourSemaineDetails */}
                <td className="p-2 align-top">
                  {getDates(p).map((d, i) => (
                    <div key={i} className="text-xs whitespace-nowrap">
                      {d.affiche}
                    </div>
                  ))}
                </td>
                
                <td className="p-2 break-words whitespace-normal">
                  {p.estWeekend ? (
                    <span className="badge badge-warning badge-sm">Oui</span>
                  ) : (
                    <span className="badge badge-ghost badge-sm">Non</span>
                  )}
                </td>
                {hasTemporaire && (
                  <>
                    <td className="p-2 break-words whitespace-normal">{p.nomDuRemplace}</td>
                    <td className="p-2 break-words whitespace-normal">{p.prenomDuRemplace}</td>
                    <td className="p-2 break-words whitespace-normal">{p.matriculeDuRemplace}</td>
                    <td className="p-2 break-words whitespace-normal">
                      {p.estTemporaire ? (
                        <span className="badge badge-warning badge-sm">Oui</span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">Non</span>
                      )}
                    </td>
                  </>
                )}
                {mode === "signature" && (
                  <td className="h-16 p-2 break-words whitespace-normal"></td>
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
              <span className="col-span-2">
                Horaires:
                {getDates(p).map((d, i) => (
                  <div key={i}>
                    {d.affiche}
                  </div>
                ))}
              </span>
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

    </section>
  );
}