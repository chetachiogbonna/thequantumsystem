import PasswordResetForm from '@/components/PasswordResetForm'
import { getUserById } from '@/lib/actions/user'
import { verifyOtp } from '@/lib/actions/verifyOTP'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{
    passwordResetCode: string,
  }>
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

async function PasswordResetCodePage({ params, searchParams }: Props) {
  const { passwordResetCode } = (await params);
  const id = (await searchParams)?.id as string
  const email = (await searchParams)?.email as string
  
  if (!id || !email) {
    return redirect("/password/reset");
  }
  
  const code = await verifyOtp({ type: "reset", email, code: passwordResetCode, uid: id });
  const user = await getUserById(id as string)

  return (
    <PasswordResetForm email={email} error={code.error} success={code.success} userId={user.uid} />
  )
}

export default PasswordResetCodePage