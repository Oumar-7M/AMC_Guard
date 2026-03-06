//src/components/admin/AdminUsersClient.tsx
"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import Wrapper from "@/components/Wrapper";
import UserForm from "@/components/admin/UserForm";
import UserTable from "@/components/admin/UserTable";
import { User, UserFormData, UserUpdateData } from "@/types/user";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/role";
import { getRoles } from "@/services/roleService";


export default function AdminUsersClient() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function load() {
      if (!token) return;

      const [usersData, rolesData] = await Promise.all([
        getUsers(token),
        getRoles(token),
      ]);

      setUsers(usersData);
      setRoles(rolesData);
    }

    load();
  }, [token]);

  /* CREATE */
  const handleCreate = async (data: UserFormData) => {
    if (!token) return;
    const newUser = await createUser(data, token);
    setUsers(prev => [...prev, newUser]);
  };

  /* UPDATE */
  const handleUpdate = async (id: string, data: UserUpdateData) => {
    if (!token) return;
  
    try {
      // On récupère l’utilisateur existant pour compléter les champs manquants
      const user = users.find(u => u.id === id);
      if (!user) return;
  
      const updatedData = {
        nom: data.nom ?? user.nom,
        prenom: data.prenom ?? user.prenom,
        username: data.username ?? user.username,
        mustChangePassword: data.mustChangePassword ?? user.mustChangePassword,
        // si le backend attend role ou autres champs, il faut les ajouter ici
      };
  
      const updated = await updateUser(id, updatedData, token);
      setUsers(prev =>
        prev.map(u => (u.id === updated.id ? updated : u))
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de l'utilisateur");
    }
  };
  

  /* DELETE */
  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await deleteUser(id, token);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <Protected>
      <ProtectedAdmin>
        <Wrapper>
          <section className="max-w-6xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>

            <UserForm
              onCreate={handleCreate}
              existingUserNames={users.map(u => u.username)}
              roles={roles}
            />


            <UserTable
              users={users}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </section>
        </Wrapper>
      </ProtectedAdmin>
    </Protected>
  );
}
