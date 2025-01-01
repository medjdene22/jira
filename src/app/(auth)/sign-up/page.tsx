import { getCurrentUser } from '@/features/auth/actions';
import { SignUpCard } from '@/features/auth/components/sign-up-card'
import { redirect } from 'next/navigation';

export default async function SignUp() {
  const user = await getCurrentUser()
  if(user) return redirect('/')
  return (
      <SignUpCard/>
  )
}

