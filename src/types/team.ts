import { Personnel, PersonnelForm } from "./personnel";

// Représente une équipe telle que renvoyée par le backend
export interface Team {
  id: string; // ✅ id obligatoire ici
  nom: string;
  description: string;
  personnels: Personnel[];
}

// Type pour la création d'une équipe (avant que l'id existe)
export interface TeamInput {
  nom: string;
  description: string;
  personnels: PersonnelForm[];
}
