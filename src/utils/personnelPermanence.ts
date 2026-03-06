//src\utils\personnelPermanence.ts
import { PermanenceSemaine } from "@/types/permanence";

export interface PersonnelEtInfo {
  grade: string;
  Nom: string;
  Prenom: string;
  Matricule: string;
  Arme: string;
  Fonction: string;
  numero: string;
  DateDebut: string;
  DateFin: string;
}

export interface PersonnelParGradeEtInfo {
  [grade: string]: PersonnelEtInfo[];
}

// Ordre militaire (du plus haut au plus bas)
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
// Normalise un grade (anti bug casse / espace / tiret)
export function normalizeGrade(grade: string): string {
  return grade
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-"); // remplace espaces par tiret
}

// Map de priorité
export const gradePriority = new Map(
  ordreMilitaire.map((grade, index) => [grade, index])
);

// Fonction sûre
export function getGradeOrder(grade: string): number {
  const normalized = normalizeGrade(grade);
  return gradePriority.get(normalized) ?? 999;
}
export function grouperPersonnelsParGradeGlobal(
  semaine: PermanenceSemaine
): PersonnelParGradeEtInfo {

  // Map par grade → Map par matricule (anti-doublons)
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

      // Si déjà présent → on ignore (suppression des doublons)
      if (temp[grade].has(matricule)) return;

      temp[grade].set(matricule, {
        grade,
        Nom: p.Nom,
        Prenom: p.Prenom,
        Matricule: matricule,
        Arme: p.Arme,
        Fonction: p.Fonction,
        numero: p.numero,
        DateDebut: persPerm.DateDebut,
        DateFin: persPerm.DateFin,
      });
    });
  });

  // Transformation Map → Array + tri par ancienneté
  const personnelsParGrade: PersonnelParGradeEtInfo = {};

  Object.keys(temp).forEach(grade => {
    personnelsParGrade[grade] = Array.from(temp[grade].values())
      .sort((a, b) =>
        a.Matricule.localeCompare(b.Matricule, "fr", { numeric: true })
      );
  });

  // Respect de l’ordre militaire
  const result: PersonnelParGradeEtInfo = {};

  ordreMilitaire.forEach(grade => {
    if (personnelsParGrade[grade]) {
      result[grade] = personnelsParGrade[grade];
    }
  });

  // Grades non listés → ajoutés à la fin
  Object.keys(personnelsParGrade).forEach(grade => {
    if (!result[grade]) {
      result[grade] = personnelsParGrade[grade];
    }
  });

  return result;
}
