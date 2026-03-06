import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 px-4">
      
      <h2 className="text-2xl md:text-3xl font-bold text-error">
        Permanence introuvable
      </h2>

      <p className="text-base text-gray-500 max-w-md">
        Cette permanence n’existe pas ou ne fait pas partie
        <span className="font-semibold"> de la base de données</span>.
      </p>

      <Link
        href="/permanence-semaine"
        className="btn btn-error btn-outline rounded-2xl px-8"
      >
        Retour au dashboard
      </Link>

    </div>
  );
}
