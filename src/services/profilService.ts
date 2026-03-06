//src/services/profilService.ts
import { Profil } from "@/types/profil";
import { authFetch } from "./api";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`; // backend

export async function getProfil(token: string): Promise<Profil> {
    const res = await authFetch(`${API_URL}/profile-user`, token);
    if (!res.ok) throw new Error("Erreur chargement Profil");
    return res.json();
  }