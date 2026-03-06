//src/components/PermanenceSemaineCard.tsx
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Jours } from "@/types/jours";
import { useRouter, useSearchParams } from "next/navigation";

export default function PermanenceSemaineCard({ jour }: { jour: Jours }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const semaineDate = searchParams.get("date"); // date de début semaine
  const total =
    3 + jour.equipe.Soldats.length;

  return (
    <div
      onClick={() =>
        router.push(`/dashboard/permanence-semaine/${semaineDate}/${jour.date}`)
      }
      className="cursor-pointer flex justify-between items-center p-5 rounded-2xl bg-base-100 shadow hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between p-3 rounded-2xl bg-base-100 shadow-sm hover:shadow-lg transition">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Permanence du {jour.date}
          </h3>
        </div>

        <p className="text-sm text-gray-500">
        {total} participant{total > 1 ? "s" : ""}
        </p>
        </div>
      </div>

      <span className="btn btn-sm btn-primary rounded-2xl">Voir</span>
    </div>
  );
}