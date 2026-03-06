//src\app\dashboard\permanence-semaine\page.tsx

import PermanenceDeSemaine from "@/components/PermanenceDeSemaine";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";

export default function page() {
  return (
    <Protected>
      <Wrapper>
        <div>
        <PermanenceDeSemaine/>
        </div>
      </Wrapper>
    </Protected>
  )
}