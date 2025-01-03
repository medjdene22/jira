'use client'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get'
import React from 'react'
import { RiAddCircleFill } from 'react-icons/ri'

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import WorkspaceAvatar from '@/features/workspaces/components/workspace-avatar'
import { useRouter } from 'next/navigation'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import CreateWorkspaceModel from '@/features/workspaces/components/create-workspace-model'
import { useCreateWorkspaceModel } from '@/features/workspaces/hooks/use-create-workspace-model'

export default function WorkspacesSwitcher() {

    const workspacesId = useWorkspaceId()
    const { open } = useCreateWorkspaceModel();


    const router = useRouter()

    const { data : workspaces } = useGetWorkspaces()

    const onSelect = (workspaceId: string) => {
        router.push(`/workspaces/${workspaceId}`)
    }

  return (
    <div className='flex flex-col gap-y-2'>
        <div className='flex items-center justify-between'>
            <p className='text-sm uppercase font-semibold text-neutral-500'>workspaces</p>
            <RiAddCircleFill onClick={open} className='size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition'/>
            <CreateWorkspaceModel/>
        </div>
        
        <Select onValueChange={onSelect} value={workspacesId || workspaces?.documents[0]?.$id}>
                <SelectTrigger className='w-full bg-neutral-200 font-medium p-1'>
                    <SelectValue placeholder=' no workspace selected'/>
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                            <div className='flex justify-start items-center gap-3 font-medium'>
                                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                <span className='truncate'>{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
        </Select>
    </div>
  )
}
