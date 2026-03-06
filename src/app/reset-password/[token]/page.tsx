//src/app/reset-password/[token]/page.tsx
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!token) {
    return <p className="text-error">Lien invalide.</p>;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <ResetPasswordForm token={token} />
    </div>
  );
}
