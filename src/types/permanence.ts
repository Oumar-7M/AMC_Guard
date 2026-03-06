//src/types/permanence.ts
import { EquipePermanenceCheck } from "./equipePermanence";
import { Jours } from "./jours";

export interface PermanenceCheck {
    date: string;         
    debut: string;           
    fin: string; 
    weekend: boolean; 
    equipe: EquipePermanenceCheck; 
    role: string;
    estTemporaire: boolean;
    nomRemplace: string;
  }

  export interface PermanenceEnCour {
    ID: string;         
    DebutPermanence: string;           
    FinPermanence: string; 
    jours: Jours; 
    
  }

  export interface PermanenceSemaine {
    ID: string;         
    debutPermanence: string;           
    finPermanence: string; 
    jours: Jours[]; 
    
  }

