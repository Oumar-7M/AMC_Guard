//src\app\dashboard\permanence-semaine\personnels-semaine\page.tsx
import PersonnelSemaineWrapper from "@/components/PersonnelSemaineWrapper";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function PagePersonnelParGrade({
  searchParams,
}: PageProps) {
  const { date } = await searchParams;

  return (
  <Protected>
      <Wrapper>
        <div>
        <PersonnelSemaineWrapper date={date} />
        </div>
      </Wrapper>
    </Protected>);
}
