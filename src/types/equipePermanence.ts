// src/types/equipePermanence.ts
import { Personnel, PersonnelPermCourante } from "./personnel";
export interface EquipePermanenceCheck {
    nomEquipe: string;
    description: string;
    GrandJour: Personnel;
    ChefRegiment: Personnel;
    ChefSection: Personnel;
    Soldats : Personnel[];
  }
  

  export interface EquipePermanenceCourante {
    id: string;
    nomEquipe: string;
    Description: string;
    GrandSemaine: PersonnelPermCourante;
    GrandJour: PersonnelPermCourante
    ChefRegiment: PersonnelPermCourante;
    ChefSection: PersonnelPermCourante;
    Soldats : PersonnelPermCourante[];
  }