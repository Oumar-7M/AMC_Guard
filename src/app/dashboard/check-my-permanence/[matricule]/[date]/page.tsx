//src\app\dashboard\check-my-permanence\[matricule]\[date]\page.tsx
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";
import CheckMyPermanenceDetails from "@/components/CheckMyPermanenceDetails";

interface PageProps {
  params: Promise<{
    matricule: string;
    date: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;
  const { matricule } = await params;
  return (
    <Protected>
      <Wrapper>
        <CheckMyPermanenceDetails
          matricule={matricule}
          date={date}
        />
      </Wrapper>
    </Protected>
  );
}
