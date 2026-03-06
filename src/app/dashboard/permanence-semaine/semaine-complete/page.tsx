//src\app\dashboard\permanence-semaine\semaine-complete\page.tsx
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";import SemaineComplete from "@/components/SemaineComplete";

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}
export default async function Page({
  searchParams,
}: PageProps) {
  const { date } = await searchParams;
  return (
    <Protected>
      <Wrapper>
        <SemaineComplete date={date}/>
      </Wrapper>
    </Protected>
  );
}
