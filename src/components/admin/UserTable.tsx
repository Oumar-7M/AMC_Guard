// src/components/admin/UserTable.tsx
"use client";

import { useState } from "react";
import { User, UserUpdateData } from "@/types/user";
import SearchToggle from "../user-interface/SearchToggle";

type Props = {
  users: User[];
  onUpdate: (id: string, data: Partial<User>) => void;
  onDelete: (id: string) => void;
};

/* ========================= DESKTOP ========================= */
function DesktopView({
  users,
  editingId,
  form,
  setForm,
  startEdit,
  save,
  cancelEdit,
  onDelete,
}: {
  users: User[];
  editingId: string | null;
  form: UserUpdateData;
  setForm: React.Dispatch<React.SetStateAction<UserUpdateData>>;
  startEdit: (user: User) => void;
  save: () => void;
  cancelEdit: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Username</th>
            <th>MustChangePassword</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const isEditing = user.id === editingId;
            return (
              <tr key={user.id}>
                <td className="whitespace-pre-wrap break-words max-w-xs">
                  {isEditing ? (
                    <input
                      className="input input-sm w-full"
                      value={form.nom ?? ""}
                      onChange={e => setForm({ ...form, nom: e.target.value })}
                    />
                  ) : (
                    user.nom
                  )}
                </td>
                <td className="whitespace-pre-wrap break-words max-w-xs">
                  {isEditing ? (
                    <input
                      className="input input-sm w-full"
                      value={form.prenom ?? ""}
                      onChange={e => setForm({ ...form, prenom: e.target.value })}
                    />
                  ) : (
                    user.prenom
                  )}
                </td>
                <td className="whitespace-pre-wrap break-words max-w-xs">
                  {isEditing ? (
                    <input
                      className="input input-sm w-full"
                      value={form.username ?? ""}
                      onChange={e => setForm({ ...form, username: e.target.value })}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="text-center">
                  {isEditing ? (
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={form.mustChangePassword ?? false}
                      onChange={e =>
                        setForm({ ...form, mustChangePassword: e.target.checked })
                      }
                    />
                  ) : user.mustChangePassword ? (
                    "Oui"
                  ) : (
                    "Non"
                  )}
                </td>
                <td className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button className="btn btn-xs btn-success" onClick={save}>
                        Sauvegarder
                      </button>
                      <button className="btn btn-xs" onClick={cancelEdit}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => startEdit(user)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => onDelete(user.id)}
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
    </div>
  );
}

/* ========================= MOBILE ========================= */
function MobileView({
  users,
  editingId,
  form,
  setForm,
  startEdit,
  save,
  cancelEdit,
  onDelete,
}: {
  users: User[];
  editingId: string | null;
  form: UserUpdateData;
  setForm: React.Dispatch<React.SetStateAction<UserUpdateData>>;
  startEdit: (user: User) => void;
  save: () => void;
  cancelEdit: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="md:hidden space-y-4">
      {users.map(user => {
        const isEditing = user.id === editingId;
        return (
          <div key={user.id} className="card bg-base-100 shadow border">
            <div className="card-body space-y-2">
              {isEditing ? (
                <>
                  <input
                    className="input input-sm w-full"
                    placeholder="Nom"
                    value={form.nom ?? ""}
                    onChange={e => setForm({ ...form, nom: e.target.value })}
                  />
                  <input
                    className="input input-sm w-full"
                    placeholder="Prénom"
                    value={form.prenom ?? ""}
                    onChange={e => setForm({ ...form, prenom: e.target.value })}
                  />
                  <input
                    className="input input-sm w-full"
                    placeholder="Username"
                    value={form.username ?? ""}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={form.mustChangePassword ?? false}
                      onChange={e =>
                        setForm({ ...form, mustChangePassword: e.target.checked })
                      }
                    />
                    <span>MustChangePassword</span>
                  </div>
                </>
              ) : (
                <>
                  <p><span className="font-semibold">Nom:</span> {user.nom}</p>
                  <p><span className="font-semibold">Prénom:</span> {user.prenom}</p>
                  <p><span className="font-semibold">Username:</span> {user.username}</p>
                  <p>
                    <span className="font-semibold">MustChangePassword:</span>{" "}
                    {user.mustChangePassword ? "Oui" : "Non"}
                  </p>
                </>
              )}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button className="btn btn-sm btn-success flex-1" onClick={save}>
                      Sauvegarder
                    </button>
                    <button className="btn btn-sm flex-1" onClick={cancelEdit}>
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-outline flex-1"
                      onClick={() => startEdit(user)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-sm btn-error flex-1"
                      onClick={() => onDelete(user.id)}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================= MAIN ========================= */
export default function UserTable({ users, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UserUpdateData>({});

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u =>
    JSON.stringify(u).toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      nom: user.nom,
      prenom: user.prenom,
      username: user.username,
      mustChangePassword: user.mustChangePassword,
    });
  };

  const save = () => {
    if (!editingId) return;
    onUpdate(editingId, form);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <>
      <div className="sticky top-0 z-20 bg-base-100 py-2 flex justify-end">
  <SearchToggle
    placeholder="Rechercher un utilisateur..."
    onSearch={setSearch}
  />
</div>


      <DesktopView
        users={filteredUsers}
        editingId={editingId}
        form={form}
        setForm={setForm}
        startEdit={startEdit}
        save={save}
        cancelEdit={cancelEdit}
        onDelete={onDelete}
      />
      <MobileView
        users={filteredUsers}
        editingId={editingId}
        form={form}
        setForm={setForm}
        startEdit={startEdit}
        save={save}
        cancelEdit={cancelEdit}
        onDelete={onDelete}
      />
    </>
  );
}
