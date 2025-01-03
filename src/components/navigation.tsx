'use client'

import Link from "next/link"
import { GoHome, GoHomeFill, GoCheck, GoCheckCircleFill } from "react-icons/go"
import { Settings, UsersIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

const routs = [
    { label: 'Home', href: '/', icon: GoHome, activeIcon: GoHomeFill },
    { label: 'My Tasks', href: '/tasks', icon: GoCheck, activeIcon: GoCheckCircleFill },
    { label: 'Settings', href: '/settings', icon: Settings, activeIcon: Settings },
    { label: 'Members', href: '/members', icon: UsersIcon, activeIcon: UsersIcon },

]

export default function Navigation() {
    const pathname = usePathname();
    const workspaceId = useWorkspaceId();   

  return (
    <ul className="flex flex-col gap-2">
        {routs.map(({ label, href, icon, activeIcon }) => {

            const fullHerf = `/workspaces/${workspaceId}${href}`
            const isactive = (pathname+'/') === fullHerf
            const Icon = isactive ? activeIcon : icon

            return (
                <Link key={href} href={fullHerf}>
                    <div className={cn(
                        "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                        isactive && "bg-white shadow-sm hover:opacity-100 text-primary"

                    )}>
                        <Icon className="size-5 " />
                        {label}
                    </div>
                </Link>
            )
        })}
    </ul>
  )
}
