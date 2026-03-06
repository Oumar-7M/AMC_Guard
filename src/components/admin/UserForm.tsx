//src/components/admin/UserForm.tsx
"use client";

import { useState } from "react";
import { UserFormData } from "@/types/user";
import { Role } from "@/types/role";

const emptyForm: UserFormData = {
  nom: "",
  prenom: "",
  username: "",
  roleID: 0, // sera choisi
};

export default function UserForm({
  onCreate,
  existingUserNames,
  roles,
}: {
  onCreate: (data: UserFormData) => void;
  existingUserNames: string[];
  roles: Role[];
}) {
  const [form, setForm] = useState<UserFormData>(emptyForm);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.nom || !form.prenom || !form.username || !form.roleID) {
      return setError("Tous les champs sont obligatoires");
    }

    if (existingUserNames.includes(form.username)) {
      return setError("Un utilisateur avec ce username existe déjà");
    }

    onCreate(form);
    setForm(emptyForm);
    setOpen(false);
  };

  return (
    <div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setOpen(o => !o)}
      >
        {open ? "Annuler" : "Ajouter un utilisateur"}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-100 p-6 rounded-xl shadow"
        >
          {error && <div className="alert alert-error">{error}</div>}

          <input
            name="nom"
            placeholder="Nom"
            className="input input-bordered"
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })}
          />

          <input
            name="prenom"
            placeholder="Prénom"
            className="input input-bordered"
            value={form.prenom}
            onChange={e => setForm({ ...form, prenom: e.target.value })}
          />

          <input
            name="username"
            placeholder="Username"
            className="input input-bordered"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <select
            className="select select-bordered"
            value={form.roleID}
            onChange={e =>
              setForm({ ...form, roleID: Number(e.target.value) })
            }
          >
            <option value={0} disabled>
              Sélectionner un rôle
            </option>

            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.nom}
              </option>
            ))}
          </select>

          <div className="md:col-span-2">
            <button className="btn btn-primary">Créer</button>
          </div>
        </form>
      )}
    </div>
  );
}
