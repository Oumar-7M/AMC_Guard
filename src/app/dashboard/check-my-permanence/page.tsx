//src\app\dashboard\check-permanence\page.tsx
import CheckMyPermanence from "@/components/CheckMyPermanence";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";


export default function page() {
  return (
    
      <Protected>
      <Wrapper>
      <div className="bg-base-100 rounded-2xl shadow p-5">
        <CheckMyPermanence />
      </div>
      </Wrapper>
    </Protected>
  )
}