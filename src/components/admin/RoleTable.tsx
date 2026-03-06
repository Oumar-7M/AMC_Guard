"use client";

import { useState } from "react";
import { Role } from "@/types/role";

export default function RoleTable({
  roles,
  onUpdate,
  onDelete,
}: {
  roles: Role[];
  onUpdate: (id: number, data: Partial<Role>) => void;
  onDelete: (id: number) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Role>>({});

  const startEdit = (role: Role) => {
    setEditingId(role.id);
    setForm(role);
  };

  const save = () => {
    if (!editingId) return;
    onUpdate(editingId, form);
    setEditingId(null);
  };

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {roles.map(role => {
          const editing = role.id === editingId;

          return (
            <tr key={role.id}>
              <td>
                {editing ? (
                  <input
                    className="input input-sm"
                    value={form.nom ?? ""}
                    onChange={e =>
                      setForm({ ...form, nom: e.target.value })
                    }
                  />
                ) : (
                  role.nom
                )}
              </td>

              <td>
                {editing ? (
                  <input
                    className="input input-sm"
                    value={form.roleDescription ?? ""}
                    onChange={e =>
                      setForm({
                        ...form,
                        roleDescription: e.target.value,
                      })
                    }
                  />
                ) : (
                  role.roleDescription
                )}
              </td>

              <td className="flex gap-2">
                {editing ? (
                  <>
                    <button className="btn btn-xs btn-success" onClick={save}>
                      Sauvegarder
                    </button>
                    <button
                      className="btn btn-xs"
                      onClick={() => setEditingId(null)}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => startEdit(role)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => onDelete(role.id)}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
