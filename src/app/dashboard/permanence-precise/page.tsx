//src\app\dashboard\permanence-precise\page.tsx
import PermanencePrecise from "@/components/PermanencePrecise";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";


export default function page() {
  return (
    <Protected>
      <Wrapper>
        <div>
          <PermanencePrecise />
        </div>
      </Wrapper>
    </Protected>
  )
}