//src\app\dashboard\permanence-semaine\[semaine]\[date]\page.tsx
import PermanenceJourSemaineDetails from "@/components/PermanenceJourSemaineDetails";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";

interface PageProps {
  params: Promise<{ date: string , semaine: string  }>;
}

export default async function Page({ params  }: PageProps) {
  
  const { semaine } = await params;
  const { date } = await params;
  console.log(date)
  console.log(semaine)
  return (
    <Protected>
      <Wrapper>
        <main className="p-6">
          <PermanenceJourSemaineDetails 
            date={date}
            semaineDate={semaine}
          />
        </main>
      </Wrapper>
    </Protected>
  );
}
