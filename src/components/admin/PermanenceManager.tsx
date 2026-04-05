"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createPermanence, updatePermanence } from "@/services/permanenceService";
import DateSearchWithSubmit from "../user-interface/DateSearchWithSubmit";

const motifs = [
  "Malade",
  "Décès",
];

export default function PermanenceManager(
) {
  const { token } = useAuth();

  // ================= CREATE =================
  const [createDate, setCreateDate] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  // ================= REMPLACER =================
  const [dateJour, setDateJour] = useState("");
  const [matriculeIndispo, setMatriculeIndispo] = useState("");
  const [motifIndispo, setMotifIndispo] = useState("");
  const [loadingReplace, setLoadingReplace] = useState(false);

  // ================= RETOUR =================
  const [matriculeRetour, setMatriculeRetour] = useState("");
  const [loadingRetour, setLoadingRetour] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // ================= CREATE =================
  const handleCreate = async () => {
    if (!token) return;

    setLoadingCreate(true);
    setMessage(null);

    try {
      const res = await createPermanence(
        token,
        createDate ? { dateDebut: createDate } : undefined
      );

      setMessage({ type: "success", text: res.message });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Erreur",
      });
    } finally {
      setLoadingCreate(false);
    }
  };
  console.log(message);

  // ================= REMPLACER =================
  const handleReplace = async () => {
    if (!token) return;

    setLoadingReplace(true);
    setMessage(null);

    try {
      const res = await updatePermanence(
        {
          dateJour,
          matriculeIndispo,
          motifIndispo,
        },
        token
      );

      setMessage({ type: "success", text: res.message });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Erreur",
      });
    } finally {
      setLoadingReplace(false);
    }
  };

  // ================= RETOUR =================
  const handleRetour = async () => {
    if (!token) return;

    setLoadingRetour(true);
    setMessage(null);

    try {
      const res = await updatePermanence(
        { matricule: matriculeRetour },
        token
      );

      setMessage({ type: "success", text: res.message });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Erreur",
      });
    } finally {
      setLoadingRetour(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ================= CREATE ================= */}
      <div className="card bg-base-100 shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Créer une permanence</h2>

        <DateSearchWithSubmit
          value={createDate}
          onChange={setCreateDate}
          onSubmit={() => {}}
        />

        <button
          className="btn btn-primary w-full"
          onClick={handleCreate}
          disabled={loadingCreate}
        >
          {loadingCreate ? "Création..." : "Créer"}
        </button>
      </div>

      {/* ================= REMPLACER ================= */}
      <div className="card bg-base-100 shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Remplacer un membre</h2>

        <input
          type="date"
          className="input input-bordered w-full"
          value={dateJour}
          onChange={(e) => setDateJour(e.target.value)}
          placeholder="Date du jour"
        />

        <input
          type="text"
          className="input input-bordered w-full"
          value={matriculeIndispo}
          onChange={(e) => setMatriculeIndispo(e.target.value)}
          placeholder="Matricule indisponible"
        />

        {/* Motif SELECT */}
      <select
        value={motifIndispo}
        onChange={(e) => setMotifIndispo(e.target.value)}
        className="select select-bordered rounded-xl"
      >
        <option value="">Sélectionner un motif</option>

        {motifs.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      
        <button
          className="btn btn-warning w-full"
          onClick={handleReplace}
          disabled={loadingReplace}
        >
          {loadingReplace ? "Remplacement..." : "Remplacer"}
        </button>
      </div>

      {/* ================= RETOUR ================= */}
      <div className="card bg-base-100 shadow-lg p-6 space-y-4 md:col-span-2">
        <h2 className="text-xl font-semibold">Retour d&apos;un membre</h2>

        <input
          type="text"
          className="input input-bordered w-full"
          value={matriculeRetour}
          onChange={(e) => setMatriculeRetour(e.target.value)}
          placeholder="Matricule"
        />

        <button
          className="btn btn-info w-full"
          onClick={handleRetour}
          disabled={loadingRetour}
        >
          {loadingRetour ? "Mise à jour..." : "Valider le retour"}
        </button>
      </div>

      {message && (
        <div
          className={`alert md:col-span-2 ${
            message.type === "success"
              ? "alert-success"
              : "alert-error"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
