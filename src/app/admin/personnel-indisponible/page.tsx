//src\app\admin\personnel-indisponible\page.tsx
import Indisponible from "@/components/admin/Indisponible";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";

export default function page() {
    return (
        <Protected>
          <ProtectedAdmin>
            <Wrapper>
                <Indisponible/>
            </Wrapper>
          </ProtectedAdmin>
        </Protected>
      );
}