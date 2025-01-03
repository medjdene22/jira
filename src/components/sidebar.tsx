import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Dotted } from './dotted'
import Navigation from './navigation'
import WorkspacesSwitcher from './workspaces-switcher'

export default function Sidebar() {
  return (
    <aside className='h-full bg-neutral-100 w-full p-4'>
      <Link href={'/'}>
        <Image src={"/logo.svg"} alt={'logo'} width={152} height={56} />
      </Link>

      <Dotted className='my-4'/>
      <WorkspacesSwitcher />
      <Dotted className='my-4'/>
      <Navigation />
    </aside>
  )
}
