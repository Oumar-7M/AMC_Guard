//src/app/admin/page.tsx
import Protected from '@/components/Protected';
import Wrapper from '@/components/Wrapper';
import AdminPage from '@/components/admin/AdminPage';
import ProtectedAdmin from '@/components/admin/ProtectedAdmin';
export default function page() {

  return (
    <Protected>
      <ProtectedAdmin>
        <Wrapper>
          <AdminPage />
        </Wrapper>
      </ProtectedAdmin>
    </Protected>
  );
}