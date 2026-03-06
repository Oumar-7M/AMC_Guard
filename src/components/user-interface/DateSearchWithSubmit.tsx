//src\components\user-interface\DateSearchWithSubmit.tsx
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export default function DateSearchWithSubmit({
  value,
  onChange,
  onSubmit,
  loading = false,
}: Props) {
  return (
    <div
      className="
        flex flex-col sm:flex-row
        items-stretch sm:items-center
        gap-2
        w-full sm:w-auto
      "
    >
      {/* Champ date */}
      <div
        className="
          flex items-center gap-2
          bg-base-200 px-3 py-2
          rounded-xl
          w-full sm:w-auto
        "
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 shrink-0" />

        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            bg-transparent outline-none
            text-sm md:text-base
            w-full sm:w-40
          "
        />
      </div>

      {/* Bouton valider */}
      <button
        onClick={onSubmit}
        disabled={!value || loading}
        className="
          btn btn-primary
          rounded-xl
          px-6
          disabled:opacity-50
        "
      >
        {loading ? "Chargement..." : "Valider"}
      </button>
    </div>
  );
}
