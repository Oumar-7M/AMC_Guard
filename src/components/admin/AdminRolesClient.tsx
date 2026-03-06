"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import Wrapper from "@/components/Wrapper";
import { Role, RoleFormData } from "@/types/role";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/services/roleService";
import { useAuth } from "@/context/AuthContext";
import RoleForm from "./RoleForm";
import RoleTable from "./RoleTable";

export default function AdminRolesClient() {
  const { token } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!token) return;
    getRoles(token).then(setRoles);
  }, [token]);

  const handleCreate = async (data: RoleFormData) => {
    if (!token) return;
    const newRole = await createRole(data, token);
    setRoles(prev => [...prev, newRole]);
  };

  const handleUpdate = async (
    id: number,
    data: Partial<RoleFormData>
  ) => {
    if (!token) return;
    const updated = await updateRole(id, data, token);
    setRoles(prev => prev.map(r => (r.id === id ? updated : r)));
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Supprimer ce rôle ?")) return;
    await deleteRole(id, token);
    setRoles(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Protected>
      <ProtectedAdmin>
        <Wrapper>
          <section className="max-w-5xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold">Gestion des rôles</h1>

            <RoleForm onCreate={handleCreate} />

            <RoleTable
              roles={roles}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </section>
        </Wrapper>
      </ProtectedAdmin>
    </Protected>
  );
}
