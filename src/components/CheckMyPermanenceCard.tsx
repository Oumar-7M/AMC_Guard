//src\components\CheckMyPermanenceCard.tsx
import Link from "next/link";
import { PermanenceCheck } from "@/types/permanence";

export default function CheckMyPermanenceCard({
  permanence,
  matricule,
}: {
  permanence: PermanenceCheck;
  matricule: string;
}) {
  return (
    <Link
      href={`/dashboard/check-my-permanence/${matricule}/${permanence.date}`}
      className="block rounded-xl border bg-base-100 p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{permanence.date}</p>
          <p className="text-sm text-base-content/70">
            {permanence.debut} – {permanence.fin}
          </p>
          <p className="text-sm">
            Équipe :{" "}
            <span className="font-medium">
              {permanence.equipe.nomEquipe}
            </span>
          </p>
        </div>

        <span className="badge badge-outline">
          {permanence.role}
        </span>
      </div>
    </Link>
  );
}
