"use client";

import { useState } from "react";
import { RoleFormData } from "@/types/role";

const emptyForm: RoleFormData = {
  nom: "",
  roleDescription: "",
};

export default function RoleForm({
  onCreate,
}: {
  onCreate: (data: RoleFormData) => void;
}) {
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
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
        {open ? "Annuler" : "Ajouter un rôle"}
      </button>

      {open && (
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-100 p-6 rounded-xl shadow"
        >
          <input
            className="input input-bordered"
            placeholder="Nom du rôle"
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })}
          />

          <input
            className="input input-bordered"
            placeholder="Description"
            value={form.roleDescription}
            onChange={e =>
              setForm({ ...form, roleDescription: e.target.value })
            }
          />

          <div className="md:col-span-2">
            <button className="btn btn-primary">Créer</button>
          </div>
        </form>
      )}
    </div>
  );
}
