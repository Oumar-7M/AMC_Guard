// src/services/teamService.ts
import { Team, TeamInput } from "@/types/team";
import { authFetch } from "./api";
import { Personnel } from "@/types/personnel";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`;
type TeamBackend = {
  id: string;
  nomEquipe: string;
  Description: string;
  personnels: Personnel[];
};

// ===================== CREATE TEAM =====================
export async function createTeam(team: TeamInput, token: string): Promise<Team> {
  const res = await authFetch(`${API_URL}/add-equipes`, token, {
    method: "POST",
    body: JSON.stringify({
      nomEquipe: team.nom,       // 👈 backend attend ce nom
      Description: team.description,
      personnels: team.personnels,
    }),
  });

  if (!res.ok) throw new Error("Erreur lors de la création de l'équipe");
  return res.json();
}

// ===================== GET TEAMS =====================
export async function getTeams(token: string): Promise<Team[]> {
  console.log(token);
  const res = await authFetch(`${API_URL}/list-equipes`, token);

//   console.log("GET TEAMS status:", res.status); // 👈 ajout
//   const text = await res.clone().text(); // clone() permet de lire deux fois
// console.log(text);
//  // 👈 ajout pour voir ce qui arrive réellement

  if (!res.ok) throw new Error("Erreur lors du chargement des équipes");

  const contentType = res.headers.get("content-type");
if (!contentType?.includes("application/json")) {
  throw new Error("La réponse n'est pas du JSON !");
}
const data: TeamBackend[] = await res.json();// ⚠ ici plante si ce n'est pas du JSON

  return data.map(t => ({
    id: t.id,
    nom: t.nomEquipe,
    description: t.Description,
    personnels: t.personnels,
  }));
}




// ===================== DELETE TEAM =====================
export async function deleteTeam(id: string, token: string): Promise<void> {
  const res = await authFetch(`${API_URL}/delete-equipes/${id}`, token, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'équipe");
}

// ===================== UPDATE TEAM =====================
export async function updateTeam(team: Team, token: string): Promise<Team> {
  const res = await authFetch(`${API_URL}/update-equipes/${team.id}`, token, {
    method: "PUT",
    body: JSON.stringify({
      nomEquipe: team.nom,
      Description: team.description,
      personnels: team.personnels,
    }),
  });

  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
}
