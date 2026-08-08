import VerifyEmailForm from "@/components/forms/VerifyEmailForm";

export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
  }) {
  const params = await searchParams
  return (
    <VerifyEmailForm email={params.email ?? ""} />)
}
