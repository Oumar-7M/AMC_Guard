//src\utils\personnelPermanence.ts
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

  dates: DatePlage[]; // 👈 IMPORTANT
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

// Normalisation
export function normalizeGrade(grade: string): string {
  return grade.toLowerCase().trim().replace(/\s+/g, "-");
}

// Priorité
export const gradePriority = new Map(
  ordreMilitaire.map((grade, index) => [grade, index])
);

export function getGradeOrder(grade: string): number {
  const normalized = normalizeGrade(grade);
  return gradePriority.get(normalized) ?? 999;
}

// 🔥 FONCTION PRINCIPALE CORRIGÉE
export function grouperPersonnelsParGradeGlobal(
  semaine: PermanenceSemaine
): PersonnelParGradeEtInfo {

  const temp: Record<string, Map<string, PersonnelEtInfo>> = {};

  semaine.jours.forEach(jour => {
    const e = jour.equipe;

    [
      e.GrandSemaine,
      e.GrandJour,
      e.ChefRegiment,
      e.ChefSection,
      ...e.Soldats
    ].forEach(persPerm => {

      if (!persPerm || !persPerm.personnel) return;

      const p = persPerm.personnel;
      const grade = p.grade;
      const matricule = p.Matricule;

      if (!temp[grade]) {
        temp[grade] = new Map();
      }

      if (temp[grade].has(matricule)) return;

      // ✅ LOGIQUE SENTINELLE
      const isSentinelle =
        p.grade?.toLowerCase() === "sentinelle" &&
        persPerm.HeureTravail &&
        persPerm.HeureTravail.length > 0;

      const dates = isSentinelle
        ? persPerm.HeureTravail!.map(h => ({
            debut: h.dateDebut,
            fin: h.dateFin,
          }))
        : [
            {
              debut: persPerm.DateDebut,
              fin: persPerm.DateFin,
            },
          ];

      temp[grade].set(matricule, {
        grade,
        Nom: p.Nom,
        Prenom: p.Prenom,
        Matricule: matricule,
        Arme: p.Arme,
        Fonction: p.Fonction,
        numero: p.numero,
        dates,
      });
    });
  });

  const personnelsParGrade: PersonnelParGradeEtInfo = {};

  Object.keys(temp).forEach(grade => {
    personnelsParGrade[grade] = Array.from(temp[grade].values())
      .sort((a, b) =>
        a.Matricule.localeCompare(b.Matricule, "fr", { numeric: true })
      );
  });

  const result: PersonnelParGradeEtInfo = {};

  ordreMilitaire.forEach(grade => {
    if (personnelsParGrade[grade]) {
      result[grade] = personnelsParGrade[grade];
    }
  });

  Object.keys(personnelsParGrade).forEach(grade => {
    if (!result[grade]) {
      result[grade] = personnelsParGrade[grade];
    }
  });

  return result;
}