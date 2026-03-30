// src/components/admin/ConvocationCard.tsx
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { formatDateFR } from "@/utils/formatDate";

interface Props {
  message: string;
}

export default function ConvocationCard({ message }: Props) {
  // Remplace toutes les dates ISO par le format FR
  const formattedMessage = message.replace(
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/g,
    (date) => formatDateFR(date)
  );

  return (
    <div
      className="
        relative
        bg-base-100
        border border-base-200
        shadow-sm hover:shadow-md transition-shadow
        rounded-xl
        p-6 md:p-8
        flex gap-4 md:gap-6
        break-inside-avoid
        print:shadow-none
        print:border
        print:border-gray-400
        print:rounded-lg
        print:bg-transparent
        print:p-6
      "
    >
      {/* Icône décorative */}
      <div className="hidden sm:flex flex-shrink-0 items-start print:hidden">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
          <DocumentTextIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Contenu */}
      <div
        className="
          flex-1
          text-sm md:text-base
          leading-relaxed
          whitespace-pre-line
          text-base-content/90
          print:text-black print:text-[12pt] print:leading-normal
        "
      >
        {formattedMessage}
      </div>
    </div>
  );
}