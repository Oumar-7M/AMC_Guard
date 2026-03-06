//src/app/permanence/page.tsx
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";
import PermanenceCourante from "@/components/PermanenceCourante";

export default function Page() {
  return (
    <Protected>
      <Wrapper>
        <PermanenceCourante />
      </Wrapper>
    </Protected>
  );
}
