// src/components/admin/TeamForm.tsx
"use client";

import { useState } from "react";
import { PersonnelForm } from "@/types/personnel";
import { TeamInput } from "@/types/team";

type TeamFormProps = {
  onCreate: (team: TeamInput) => void;
  existingNames: string[];
};

const emptyPersonnel: PersonnelForm = {
  Nom: "",
  Prenom: "",
  grade: "",
  willaya: "",
  ville: "",
  numero: "",
  Fonction: "",
  Matricule: "",
  Arme: "",
  email: ""
};

export default function TeamForm({ onCreate, existingNames }: TeamFormProps) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [personnels, setPersonnels] = useState<PersonnelForm[]>([]);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setNom("");
    setDescription("");
    setPersonnels([]);
    setError(null);
    setOpen(false);
  };

  const handleAddPersonnel = () => setPersonnels(prev => [...prev, { ...emptyPersonnel }]);
  const handleRemovePersonnel = (index: number) =>
    setPersonnels(prev => prev.filter((_, i) => i !== index));
  const handleChangePersonnel = (index: number, field: keyof PersonnelForm, value: string) =>
    setPersonnels(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedNom = nom.trim();
    if (!trimmedNom) return setError("Le nom de l'équipe est obligatoire.");
    if (existingNames.includes(trimmedNom)) return setError("Une équipe avec ce nom existe déjà.");

    onCreate({ nom: trimmedNom, description: description.trim(), personnels });
    resetForm();
  };

  return (
    <div className="border rounded-lg p-4 bg-base-100 shadow-sm">
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setOpen(o => !o);
          setError(null);
        }}
      >
        {open ? "Annuler" : "Ajouter une équipe"}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="alert alert-error py-2 text-sm">{error}</div>}

          {/* Nom et description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Nom de l'équipe"
            />
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Description"
            />
          </div>

          {/* Personnels */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Membres de l&apos;équipe</h3>

            {personnels.map((p, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3 bg-base-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input placeholder="Nom" value={p.Nom} onChange={e => handleChangePersonnel(idx, "Nom", e.target.value)} className="input input-bordered" />
                  <input placeholder="Prénom" value={p.Prenom} onChange={e => handleChangePersonnel(idx, "Prenom", e.target.value)} className="input input-bordered" />
                  <input placeholder="Grade" value={p.grade} onChange={e => handleChangePersonnel(idx, "grade", e.target.value)} className="input input-bordered" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input placeholder="Wilaya" value={p.willaya} onChange={e => handleChangePersonnel(idx, "willaya", e.target.value)} className="input input-bordered" />
                  <input placeholder="Ville" value={p.ville} onChange={e => handleChangePersonnel(idx, "ville", e.target.value)} className="input input-bordered" />
                  <input placeholder="Téléphone" value={p.numero} onChange={e => handleChangePersonnel(idx, "numero", e.target.value)} className="input input-bordered" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input placeholder="Fonction" value={p.Fonction} onChange={e => handleChangePersonnel(idx, "Fonction", e.target.value)} className="input input-bordered" />
                  <input placeholder="Matricule" value={p.Matricule} onChange={e => handleChangePersonnel(idx, "Matricule", e.target.value)} className="input input-bordered" />
                  <input placeholder="Arme" value={p.Arme} onChange={e => handleChangePersonnel(idx, "Arme", e.target.value)} className="input input-bordered" />
                  <input placeholder="Email" value={p.email} onChange={e => handleChangePersonnel(idx, "email", e.target.value)} className="input input-bordered" />
                </div>

                <button type="button" className="btn btn-error btn-sm" onClick={() => handleRemovePersonnel(idx)}>
                  Supprimer ce membre
                </button>
              </div>
            ))}

            <button type="button" className="btn btn-ghost btn-sm" onClick={handleAddPersonnel}>
              + Ajouter un membre
            </button>
          </div>

          <button type="submit" className="btn btn-success w-full">Enregistrer l&apos;équipe</button>
        </form>
      )}
    </div>
  );
}
