// src/types/permanenceCreate.ts
export interface CreatePermanencePayload {
    dateDebut?: string; // optionnelle
  }
  
// Cas 1 : rendre indisponible
export interface UpdatePermanenceIndispoPayload {
  dateJour: string;
  matriculeIndispo: string;
  motifIndispo: string;
}

// Cas 2 : retour (re-disponible)
export interface UpdatePermanenceRetourPayload {
  matricule: string;
}

export interface CreatePermanenceResponse {
  message: string;
}
