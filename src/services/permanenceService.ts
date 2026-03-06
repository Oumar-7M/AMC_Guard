//src/services/permanenceService.ts
import {  PermanenceEnCour, PermanenceSemaine } from "@/types/permanence";
import { authFetch } from "./api";
import { CreatePermanencePayload, CreatePermanenceResponse, UpdatePermanenceIndispoPayload, UpdatePermanenceRetourPayload } from "@/types/permanenceCreate";
import { PersonnelIndispo } from "@/types/personnel";
import { ConvocationType } from "@/types/convocationType";

// Utiliser l’URL du backend depuis les variables d’environnement
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;


/**
 * Crée une nouvelle permanence
 */
export async function createPermanence(
  token: string,
  payload?: CreatePermanencePayload
): Promise<CreatePermanenceResponse> {
  const res = await authFetch(
    `${API_URL}/admin/genere-permanence-manuellement`,
    token,
    {
      method: "POST",
      body: payload ? JSON.stringify(payload) : undefined,
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la création de la permanence");
  }

  return res.json();
}


// ===================== UPDATE Permanence =====================

export async function updatePermanence(
  data: UpdatePermanenceIndispoPayload | UpdatePermanenceRetourPayload,
  token: string
): Promise<CreatePermanenceResponse> {

  // ================= CAS 1 : Retour =================
  if ("matricule" in data) {

    const res = await authFetch(
      `${API_URL}/admin/rattraper/${data.matricule}`,
      token,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      throw new Error("Erreur lors du retour en disponibilité");
    }

    return res.json();
  }

  // ================= CAS 2 : Remplacement =================
  const res = await authFetch(
    `${API_URL}/admin/remplacer`,
    token,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors du remplacement");
  }

  return res.json();
}




/**
 * Récupère la permanence
 */
export async function getPermanenceCourante(
  token: string
): Promise<PermanenceEnCour> {

  const res = await authFetch(
    `${API_URL}/permanence/courante`,
    token,
    { cache: "no-store" }
  );
  
  if (!res.ok) throw new Error("Impossible de récupérer la permanence du jour");
  

  return res.json();
}


export async function getPermanenceSemaine(date:string, token: string): Promise<PermanenceSemaine> {
  const res = await authFetch(`${API_URL}/liste-semaine/${date}`, token);

  if (!res.ok) throw new Error("Impossible de récupérer les permanences de la semaine");

  return res.json();
}


export async function getPermanencePrecise(
  date: string,
  token: string,
  role?: string
): Promise<PermanenceEnCour> {

  const url = role
    ? `${API_URL}/permanence/par-date/${date}/${role}`
    : `${API_URL}/permanence/par-date/${date}`;

  const res = await authFetch(url, token);

  if (!res.ok) {
    throw new Error("Impossible de récupérer la permanence recherchée");
  }

  return res.json();
}


export async function getIndispoPermanence(token: string): Promise<PersonnelIndispo[]> {
  const res = await authFetch(`${API_URL}/admin/all-indisponible`, token);

  if(!res.ok) throw new Error("Impossible de récupérer la liste des Personnels Indisponibles");

  return res.json();
}

export async function getConvocationPermanence(date:string, token: string): Promise<ConvocationType> {
  const res = await authFetch(`${API_URL}/admin/convocation_officier/${date}`, token);

  if(!res.ok) throw new Error("Impossible de récupérer les convocations de la semaine");

  return res.json();
}
