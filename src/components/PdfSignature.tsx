"use client";

interface Props {
  titre?: string;
}

export default function PdfSignature({ titre = "Autorité" }: Props) {
  return (
    <div className="mt-16 print:mt-24">

      {/* SIGNATURE */}
      <div className="flex justify-between items-end">

        <div className="text-sm">
          <p>Fait à Cherchell</p>
          <p>Le {new Date().toLocaleDateString()}</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">{titre}</p>

          {/* espace signature */}
          <div className="h-20"></div>

          <p className="text-sm">Signature et Cachet</p>
        </div>

      </div>

      {/* FOOTER PAGINATION */}
      <div className="hidden print:flex justify-between text-xs mt-10 border-t pt-2">
        <span>Académie Militaire de Cherchell</span>

        
      </div>

    </div>
  );
}