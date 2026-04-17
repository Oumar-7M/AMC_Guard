import { PermanenceSemaine } from "@/types/permanence";

export interface DatePlage {
  debut: string;
  fin: string;
}

export interface PersonnelEtInfo {
  grade: string;
  Nom: string;
  Prenom: string;
  Matricule: string;
  Arme: string;
  Fonction: string;
  numero: string;
  dates: DatePlage[];
}

export interface PersonnelParGradeEtInfo {
  [grade: string]: PersonnelEtInfo[];
}

// Ordre militaire
export const ordreMilitaire = [
  "colonel",
  "lieutenant-colonel",
  "commandant",
  "capitaine",
  "lieutenant",
  "sous-lieutenant",
  "sergent",
  "caporal",
  "soldat",
];

export function normalizeGrade(grade: string): string {
  return grade.toLowerCase().trim().replace(/\s+/g, "-");
}

export const gradePriority = new Map(
  ordreMilitaire.map((g, i) => [g, i])
);

export function getGradeOrder(grade: string): number {
  return gradePriority.get(normalizeGrade(grade)) ?? 999;
}

// 🔥 FONCTION PRINCIPALE CLEAN
export function grouperPersonnelsParGradeGlobal(
  semaine: PermanenceSemaine
): PersonnelParGradeEtInfo {

  const temp: Record<string, Map<string, PersonnelEtInfo>> = {};

  semaine.jours.forEach((jour) => {
    const e = jour.equipe;

    [
      e.GrandSemaine,
      e.GrandJour,
      e.ChefRegiment,
      e.ChefSection,
      ...e.Soldats,
    ].forEach((persPerm) => {
      if (!persPerm?.personnel) return;

      const p = persPerm.personnel;
      const grade = p.grade;
      const matricule = p.Matricule;

      if (!temp[grade]) {
        temp[grade] = new Map();
      }

      // ✅ SAFE HeureTravail
      const heureTravail = persPerm.HeureTravail ?? [];

      const isSentinelle = heureTravail.length > 0;

      const newDates: DatePlage[] = isSentinelle
        ? heureTravail.map((h) => ({
            debut: h.dateDebut,
            fin: h.dateFin,
          }))
        : [
            {
              debut: persPerm.DateDebut,
              fin: persPerm.DateFin,
            },
          ];

      // 🔥 EXISTE DÉJÀ → fusion
      if (temp[grade].has(matricule)) {
        const existing = temp[grade].get(matricule)!;

        newDates.forEach((nd) => {
          const exists = existing.dates.some(
            (d) => d.debut === nd.debut && d.fin === nd.fin
          );

          if (!exists) {
            existing.dates.push(nd);
          }
        });
      }

      // 🔥 NOUVEAU → création
      else {
        temp[grade].set(matricule, {
          grade,
          Nom: p.Nom,
          Prenom: p.Prenom,
          Matricule: matricule,
          Arme: p.Arme,
          Fonction: p.Fonction,
          numero: p.numero,
          dates: newDates,
        });
      }
    });
  });

  const personnelsParGrade: PersonnelParGradeEtInfo = {};

  Object.keys(temp).forEach((grade) => {
    personnelsParGrade[grade] = Array.from(temp[grade].values()).sort(
      (a, b) =>
        a.Matricule.localeCompare(b.Matricule, "fr", { numeric: true })
    );
  });

  const result: PersonnelParGradeEtInfo = {};

  ordreMilitaire.forEach((grade) => {
    if (personnelsParGrade[grade]) {
      result[grade] = personnelsParGrade[grade];
    }
  });

  Object.keys(personnelsParGrade).forEach((grade) => {
    if (!result[grade]) {
      result[grade] = personnelsParGrade[grade];
    }
  });

  return result;
}