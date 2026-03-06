"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  date: string;
  role: string;
  onDateChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

const roles = [
  "Grand_Semaine",
  "Chef_Regiment",
  "Chef_Section",
  "Garde",
];

export default function DateRoleSearch({
  date,
  role,
  onDateChange,
  onRoleChange,
  onSubmit,
  loading = false,
}: Props) {

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">

      {/* DATE */}
      <div className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-xl">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />

        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-transparent outline-none text-sm md:text-base"
        />
      </div>

      {/* ROLE SELECT */}
      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="select select-bordered rounded-xl"
      >
        <option value="">Sélectionner un rôle</option>

        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* BOUTON */}
      <button
        onClick={onSubmit}
        disabled={!date || loading}
        className="btn btn-primary rounded-xl"
      >
        {loading ? "Chargement..." : "Valider"}
      </button>

    </div>
  );
}