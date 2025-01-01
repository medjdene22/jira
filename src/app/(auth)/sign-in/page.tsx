import { getCurrentUser } from '@/features/auth/actions'
import { SignInCard } from '@/features/auth/components/sign-in-card'
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const user = await getCurrentUser()
  if(user) return redirect('/')
  return (
      <SignInCard />
  )
}

