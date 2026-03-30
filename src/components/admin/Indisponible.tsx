//src\components\admin\Indisponible.tsx
"use client";

import { useMemo, useState } from "react";
import useIndispoPermanence from "@/hooks/useIndispoPermanence";
import { formatDateFR } from "@/utils/formatDate";

const ITEMS_PER_PAGE = 8;

export default function Indisponible() {
  const { PersonnelIndispo, loading, error } = useIndispoPermanence();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // ================= FILTRAGE + TRI =================
  const filteredData = useMemo(() => {
    const filtered = PersonnelIndispo.filter((p) =>
      p.matricule.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.datePermanence).getTime();
      const dateB = new Date(b.datePermanence).getTime();

      return sortOrder === "desc"
        ? dateB - dateA
        : dateA - dateB;
    });

  }, [PersonnelIndispo, search, sortOrder]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= STATES =================
  if (loading)
    return <p className="text-center py-10">Chargement...</p>;

  if (error)
    return (
      <p className="text-red-500 text-center py-10">
        {error}
      </p>
    );

  if (PersonnelIndispo.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">
        Aucun personnel indisponible.
      </p>
    );

  return (
    <section className="space-y-6 p-4">

      <h1 className="text-2xl font-bold">
        Personnels indisponibles
      </h1>

      {/* ================= RECHERCHE + TRI ================= */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">

        <input
          type="text"
          placeholder="Rechercher par matricule..."
          className="input input-bordered w-full md:max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select select-bordered w-full md:w-60"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as "asc" | "desc");
            setCurrentPage(1);
          }}
        >
          <option value="desc">Date : plus récent</option>
          <option value="asc">Date : plus ancien</option>
        </select>

      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl border shadow-sm">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Rôle</th>
              <th>Remplaçant</th>
              <th>Contact Remplaçant</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p) => (
              <tr key={p.matricule}>
                <td className="font-medium">{p.nom}</td>
                <td>{p.prenom}</td>
                <td>{p.matricule}</td>
                <td>{p.numero}</td>
                <td>{formatDateFR(p.datePermanence)}</td>
                <td>
                  <span className="badge badge-info badge-sm">
                    {p.role}
                  </span>
                </td>
                <td>
                  {p.remplaçant} ({p.matriculeRemplacant})
                </td>
                <td>{p.numeroRemplacant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((p) => (
          <div
            key={p.matricule}
            className="rounded-xl border p-4 bg-white shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">
                {p.prenom} {p.nom}
              </p>
              <span className="badge badge-info badge-sm">
                {p.role}
              </span>
            </div>

            <div className="text-xs text-gray-600 space-y-1">
              <p>Matricule : {p.matricule}</p>
              <p>Téléphone : {p.numero}</p>
              <p>Date : {formatDateFR(p.datePermanence)}</p>
            </div>

            <div className="pt-2 border-t text-xs">
              <p className="font-semibold">Remplaçant :</p>
              <p>
                {p.remplaçant} ({p.matriculeRemplacant})
              </p>
              <p>Tél : {p.numeroRemplacant}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    </section>
  );
}