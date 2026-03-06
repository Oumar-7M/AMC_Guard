// src/components/admin/AdminPage.tsx
import Link from "next/link";
import { Users, CalendarDays, UsersRound, ShieldCheck } from "lucide-react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export default function AdminPage() {
  const links = [
    {
      name: "Utilisateurs",
      description: "Gérer les comptes",
      href: "/admin/users",
      icon: <Users className="w-7 h-7" />,
    },
    {
      name: "Roles",
      description: "Gérer les roles",
      href: "/admin/roles",
      icon: <ShieldCheck className="w-7 h-7" />,
    },
    {
      name: "Teams",
      description: "Gérer les équipes",
      href: "/admin/team",
      icon: <UsersRound className="w-7 h-7" />,
    },
    {
      name: "Permanences",
      description: "Créer et planifier",
      href: "/admin/create-permanence",
      icon: <CalendarDays className="w-7 h-7" />,
    },
    {
      name: "Convocations de la Permanence",
      description: "Gérer les convocations",
      href: "/admin/convocations",
      icon: <ClipboardDocumentCheckIcon className="w-7 h-7" />
    },
    {
      name: "Indisponibles",
      description: "consulter la liste du personnel Indisponible",
      href: "/admin/personnel-indisponible",
      icon: <Users className="w-7 h-7" />,
    },
    
  ];

  return (
    <section className="w-full px-4 md:px-8 py-6">
      {/* Titre */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Tableau de bord Administrateur
        </h1>
        <p className="text-base-content/70 mt-1">
          Gérer les équipes, permanences, utilisateurs et roles
        </p>
      </div>

      {/* Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                  {link.icon}
                </div>
                <div>
                  <h2 className="card-title text-lg">{link.name}</h2>
                  <p className="text-sm text-base-content/70">
                    {link.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
