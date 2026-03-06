//src/services/userService.ts
import { User, UserFormData } from "@/types/user";
import { authFetch } from "./api";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`; // backend

/* GET ALL USERS                                                       */

export async function getUsers(token: string): Promise<User[]> {
  const res = await authFetch(`${API_URL}/liste-user`, token);
  if (!res.ok) throw new Error("Erreur chargement utilisateurs");
  return res.json();
}

/* CREATE USER                                                         */

export async function createUser(user: UserFormData, token: string): Promise<User> {

  const res = await authFetch(`${API_URL}/ajouter-user`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Erreur lors de la création de l'utilisateur");
  return res.json();
}

/* UPDATE USER                                                         */

export async function updateUser(
  id: string,
  data: Partial<User>,
  token: string
): Promise<User> {
  const res = await authFetch(`${API_URL}/update-user/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  return res.json();
}

/* DELETE USER                                                         */

export async function deleteUser(id: string, token: string): Promise<void> {

  const res = await authFetch(`${API_URL}/delete-user/${id}`, token, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'utilisateur");
}
