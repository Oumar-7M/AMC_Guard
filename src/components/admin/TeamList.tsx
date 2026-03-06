// src/components/admin/TeamList.tsx
"use client";

import { useState } from "react";
import { Team } from "@/types/team";
import { Personnel } from "@/types/personnel";
import SearchToggle from "../user-interface/SearchToggle";

/* ========================= TYPES ========================= */

type TeamListProps = {
  teams: Team[];
  onDelete: (team: Team) => void;
  onUpdateMembers: (team: Team) => void;
};

type ViewProps = {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
};

/* ========================= CONST ========================= */

const emptyPersonnel: Personnel = {
  Nom: "",
  Prenom: "",
  grade: "",
  willaya: "",
  ville: "",
  numero: "",
  Fonction: "",
  Matricule: "",
  Arme: "",
  Id: "",
  email: ""
};

/* ========================= DESKTOP ========================= */

function DesktopView({ teams, onEdit, onDelete }: ViewProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Membres</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => {
            const members = team.personnels
              .map(p => `${p.Nom} ${p.Prenom}`.trim())
              .filter(Boolean);

            return (
              <tr key={team.id}>
                <td className="font-semibold">{team.nom}</td>
                <td>{team.description || "-"}</td>
                <td>{members.length ? members.join(", ") : "Aucun membre"}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(team)}
                  >
                    Voir/Éditer
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => onDelete(team)}
                  >
                    Supprimer
                  </button>
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

function MobileView({ teams, onEdit, onDelete }: ViewProps) {
  return (
    <div className="md:hidden space-y-4">
      {teams.map(team => (
        <div key={team.id} className="card bg-base-100 shadow border">
          <div className="card-body space-y-2">
            <h2 className="card-title">{team.nom}</h2>
            <p>{team.description || "Aucune description"}</p>

            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-primary flex-1"
                onClick={() => onEdit(team)}
              >
                Voir / Éditer
              </button>
              <button
                className="btn btn-sm btn-error flex-1"
                onClick={() => onDelete(team)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========================= MAIN ========================= */

export default function TeamList({
  teams,
  onDelete,
  onUpdateMembers,
}: TeamListProps) {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [description, setDescription] = useState("");
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* 🔍 recherche */
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter(team =>
    JSON.stringify(team).toLowerCase().includes(search.toLowerCase())
  );
  


  /* ================= EDIT ================= */

  const startEdit = (team: Team) => {
    setEditingTeam(team);
    setDescription(team.description || "");
    setPersonnels(team.personnels.map(p => ({ ...p })));
    setError(null);
  };

  const cancelEdit = () => {
    setEditingTeam(null);
    setDescription("");
    setPersonnels([]);
    setError(null);
  };

  const validate = (): boolean => {
    if (
      personnels.some(
        p => !p.Nom.trim() || !p.Prenom.trim()
      )
    ) {
      setError("Chaque membre doit avoir un nom et un prénom.");
      return false;
    }
    return true;
  };

  const save = () => {
    if (!editingTeam) return;
    if (!validate()) return;

    onUpdateMembers({
      ...editingTeam,
      description: description.trim(),
      personnels: personnels,
    });

    cancelEdit();
  };

  const updatePersonnel = (
    index: number,
    field: keyof Personnel,
    value: string
  ) => {
    setPersonnels(prev =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const removePersonnel = (index: number) => {
    setPersonnels(prev => prev.filter((_, i) => i !== index));
  };

  const confirmDeleteTeam = (team: Team) => {
    if (
      window.confirm(
        `Supprimer définitivement l'équipe "${team.nom}" ?`
      )
    ) {
      onDelete(team);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="relative">
      {/* 🔍 SEARCH BAR */}
      <div className="sticky top-0 z-20 bg-base-100 py-2 flex justify-end">
        <SearchToggle
          placeholder="Rechercher une équipe..."
          onSearch={setSearch}
        />
      </div>

      <DesktopView
        teams={filteredTeams}
        onEdit={startEdit}
        onDelete={confirmDeleteTeam}
      />

      <MobileView
        teams={filteredTeams}
        onEdit={startEdit}
        onDelete={confirmDeleteTeam}
      />

      {editingTeam && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-4xl">
            {/* 🔍 recherche membres */}
            <SearchToggle
              placeholder="Rechercher un membre..."
              onSearch={q => {
                if (!editingTeam) return;
                const query = q.toLowerCase();

                setPersonnels(
                  editingTeam.personnels.filter(p =>
                    JSON.stringify(p).toLowerCase().includes(query)
                  )
                );
              }}
              className="mb-4 justify-end"
            />

            <h3 className="font-bold text-lg mb-4">
              Éditer l’équipe : {editingTeam.nom}
            </h3>

            {error && (
              <div className="alert alert-error mb-4">
                {error}
              </div>
            )}

            <input
              className="input input-bordered w-full mb-4"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="space-y-4">
              {personnels.map((p, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-base-200 space-y-2"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Nom *"
                      value={p.Nom}
                      onChange={e =>
                        updatePersonnel(i, "Nom", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Prénom *"
                      value={p.Prenom}
                      onChange={e =>
                        updatePersonnel(i, "Prenom", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Matricule"
                      value={p.Matricule}
                      onChange={e =>
                        updatePersonnel(i, "Matricule", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Arme"
                      value={p.Arme}
                      onChange={e =>
                        updatePersonnel(i, "Arme", e.target.value)
                      }
                    /><input
                      className="input input-bordered input-sm"
                      placeholder="Grade"
                      value={p.grade}
                      onChange={e =>
                        updatePersonnel(i, "grade", e.target.value)
                      }
                    /><input
                      className="input input-bordered input-sm"
                      placeholder="Fonction"
                      value={p.Fonction}
                      onChange={e =>
                        updatePersonnel(i, "Fonction", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Willaya"
                      value={p.willaya}
                      onChange={e =>
                        updatePersonnel(i, "willaya", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Ville"
                      value={p.ville}
                      onChange={e =>
                        updatePersonnel(i, "ville", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Telephone"
                      value={p.numero}
                      onChange={e =>
                        updatePersonnel(i, "numero", e.target.value)
                      }
                    />
                    <input
                      className="input input-bordered input-sm"
                      placeholder="Email"
                      value={p.email}
                      onChange={e =>
                        updatePersonnel(i, "email", e.target.value)
                      }
                    />
                  </div>

                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => removePersonnel(i)}
                  >
                    Supprimer ce membre
                  </button>
                </div>
              ))}

              <button
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setPersonnels(prev => [...prev, { ...emptyPersonnel }])
                }
              >
                + Ajouter un membre
              </button>
            </div>

            <div className="modal-action">
              <button className="btn btn-success" onClick={save}>
                Enregistrer
              </button>
              <button className="btn" onClick={cancelEdit}>
                Annuler
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>


  );
}
