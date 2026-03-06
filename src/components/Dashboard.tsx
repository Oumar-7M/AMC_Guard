//src/components/Dashboard.tsx
"use client";
import Link from "next/link";
import {
  ClockIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const links = [
    {
      name: "Permanence à une date précise",
      description: "Indiquez une date pour consulter la permanence programée ce jour-là ainsi que les informations de l'équipe concernée",
      href: "/dashboard/permanence-precise",
      icon: ClockIcon,
    },
    {
      name: "Permanences d'une semaine",
      description: "Saisissez une date pour afficher toutes les permanences de la semaine correspondante, du début à la fin de la période",
      href: "/dashboard/permanence-semaine",
      icon: CalendarDaysIcon,
    },
    {
      name: "Permanences d'un matricule",
      description:
        "Saisissez un matricule pour consulter toutes les permanences associées à ce personnel",
      href: "/dashboard/check-my-permanence",
      icon: MagnifyingGlassIcon,
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-6 space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">
          Tableau de bord
        </h1>
        <p className="text-sm md:text-base text-base-content/60">
          Accès rapide aux fonctionnalités de gestion des permanences
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="
                group rounded-2xl border border-base-200 bg-base-100
                p-5 shadow-sm hover:shadow-lg
                hover:border-primary/30
                transition-all duration-300
              "
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="
                    rounded-xl bg-primary/10 p-3
                    text-primary
                    group-hover:scale-110 transition-transform
                  "
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold group-hover:text-primary">
                    {link.name}
                  </h2>
                  <p className="text-sm text-base-content/70 leading-snug">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
