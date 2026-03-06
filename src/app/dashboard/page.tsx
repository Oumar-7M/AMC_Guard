//src/app/dashboard/page.tsx
import Dashboard from '@/components/Dashboard';
import Protected from '@/components/Protected';
import Wrapper from '@/components/Wrapper';

export default function page() {
  return (
    <Protected>
      <Wrapper>
        <div>
          <Dashboard />
        </div>
      </Wrapper>
    </Protected>
  );
}