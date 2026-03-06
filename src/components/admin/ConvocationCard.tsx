import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface Props {
  message: string;
}

export default function ConvocationCard({ message }: Props) {
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
        
        /* GESTION DE L'IMPRESSION */
        break-inside-avoid
        print:shadow-none
        print:border
        print:border-gray-400
        print:rounded-lg
        print:bg-transparent
        print:p-6
      "
    >
      {/* Icône décorative (masquée à l'impression) */}
      <div className="hidden sm:flex flex-shrink-0 items-start print:hidden">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
          <DocumentTextIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Contenu du message */}
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
        {message}
      </div>
    </div>
  );
}