// src/components/admin/AdminTeamsClient.tsx
"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import Wrapper from "@/components/Wrapper";
import TeamForm from "./TeamForm";
import TeamList from "./TeamList";
import { Team, TeamInput } from "@/types/team";
import { getTeams, createTeam, deleteTeam, updateTeam } from "@/services/teamService";
import { useAuth } from "@/context/AuthContext";

export default function AdminTeamsClient() {
  const { token } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getTeams(token).then(setTeams).finally(() => setLoading(false));
  }, [token]);

  const handleCreate = async (teamInput: TeamInput) => {
    if (!token) return;
    const newTeam = await createTeam(teamInput, token); // backend renvoie l'id
    setTeams(prev => [...prev, newTeam]);
  };

  const handleDelete = async (team: Team) => {
    if (!token) return;
    await deleteTeam(team.id, token);
    setTeams(prev => prev.filter(t => t.id !== team.id));
  };

  const handleUpdateMembers = async (team: Team) => {
    if (!token) return;
    const savedTeam = await updateTeam(team, token);
    setTeams(prev => prev.map(t => (t.id === savedTeam.id ? savedTeam : t)));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <Protected>
      <ProtectedAdmin>
        <Wrapper>
          <section className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Gestion des équipes</h1>

            <TeamForm onCreate={handleCreate} existingNames={teams.map(t => t.nom)} />

            {teams.length > 0 && (
              <TeamList teams={teams} onDelete={handleDelete} onUpdateMembers={handleUpdateMembers} />
            )}
          </section>
        </Wrapper>
      </ProtectedAdmin>
    </Protected>
  );
}
