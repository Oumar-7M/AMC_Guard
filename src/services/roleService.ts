//src/services/roleService.ts
// src/services/roleService.ts
import { authFetch } from "./api";
import { Role, RoleFormData } from "@/types/role";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/role`;

export async function getRoles(token: string): Promise<Role[]> {
  const res = await authFetch(`${API_URL}/list-role`, token);
  if (!res.ok) throw new Error("Erreur chargement rôles");
  return res.json();
}

export async function createRole(
  data: RoleFormData,
  token: string
): Promise<Role> {
  const res = await authFetch(`${API_URL}/add-role`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur création rôle");
  return res.json();
}

export async function updateRole(
  id: number,
  data: Partial<RoleFormData>,
  token: string
): Promise<Role> {
  const res = await authFetch(`${API_URL}/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur mise à jour rôle");
  return res.json();
}

export async function deleteRole(id: number, token: string): Promise<void> {
  const res = await authFetch(`${API_URL}/${id}`, token, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erreur suppression rôle");
}
