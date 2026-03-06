// src/app/admin/createpermanence/page.tsx
import Protected from "@/components/Protected";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import Wrapper from "@/components/Wrapper";
import PermanenceManager from "@/components/admin/PermanenceManager";
export default function PermanencePage() {
  return (
    <Protected>
      <ProtectedAdmin>
        <Wrapper>
          <section className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <header className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">
                Gestion des permanences
              </h1>
              <p className="text-base-content/70">
                Crée, modifie ou gère les indisponibilités des membres.
              </p>
            </header>

            <PermanenceManager />
          </section>
        </Wrapper>
      </ProtectedAdmin>
    </Protected>
  );
}
