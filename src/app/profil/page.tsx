// src/app/profil/page.tsx
import ProfilCard from "@/components/ProfilCard";
import Protected from "@/components/Protected";

export default function ProfilPage() {
  return (
    <Protected>
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <ProfilCard />
      </div>
    </Protected>
  );
}
