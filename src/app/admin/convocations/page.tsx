//src\app\admin\convocations\page.tsx
import Convocation from "@/components/admin/Convocation";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import Protected from "@/components/Protected";
import Wrapper from "@/components/Wrapper";

export default function page() {
    return (
        <Protected>
          <ProtectedAdmin>
            <Wrapper>
                <Convocation/>
            </Wrapper>
          </ProtectedAdmin>
        </Protected>
      );
}