import { getCurrentUser } from '@/features/auth/actions';
import { redirect, useParams } from 'next/navigation'
import React from 'react'

export default async function Page() {

  const user = await getCurrentUser();
  if(!user) redirect('/sign-in')
    
  return (
    <div>Workspaces id</div>
  )
}
