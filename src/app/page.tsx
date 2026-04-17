// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center">

      {/* BACKGROUND */}
      <Image
        src="/images/amc.jpg"
        alt="Académie Militaire de Cherchell"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-2 gap-10 items-center text-white">

        {/* LEFT SIDE */}
        <div className="space-y-6 text-center md:text-left">

          {/* TITLE + GLOW */}
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              AMC-Guard
            </h1>
            
          </div>

          <p className="text-base md:text-lg text-gray-200 max-w-lg mx-auto md:mx-0">
            Une solution moderne pour la gestion intelligente des permanences
            au sein de l’Académie Militaire de Cherchell.
          </p>

          <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto md:mx-0">
            Organisez, suivez et optimisez les plannings du personnel en
            temps réel avec une interface simple, rapide et sécurisée.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center md:justify-start">

            <Link
              href="/sign-in"
              className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-blue-500/30 transition"
            >
              Se connecter
            </Link>

            <Link
              href="#features"
              className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition backdrop-blur-sm"
            >
              En savoir plus
            </Link>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mt-6 md:mt-0"
        >

          <FeatureCard
            title="Planification optimisée"
            desc="Organisation automatique et structurée des permanences."
          />

          <FeatureCard
            title="Gestion des personnels"
            desc="Affectation intelligente selon les rôles et responsabilités."
          />

          <FeatureCard
            title="Suivi en temps réel"
            desc="Visualisation instantanée des plannings et modifications."
          />

        </div>

      </div>
    </main>
  );
}

/* 🔹 COMPONENT */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-lg hover:bg-white/10 hover:border-white/20 transition duration-300 hover:scale-[1.02]">
      <h3 className="font-semibold text-base md:text-lg mb-1">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">
        {desc}
      </p>
    </div>
  );
}