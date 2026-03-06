//src/services/checkMypermanenceService.ts
import { PermanenceCheck } from "@/types/permanence";
import { authFetch } from "./api";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;


// Fonction métier : vérifier l'affectation d'un utilisateur
export async function checkUserPermanence(
  matricule: string,
  token: string
): Promise<PermanenceCheck[]> {
  const res = await authFetch(`${API_URL}/permanence/${matricule}`, token, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la vérification de la permanence");
  }

  return res.json();
}
