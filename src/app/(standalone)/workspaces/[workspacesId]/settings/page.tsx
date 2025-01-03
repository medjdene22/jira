import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface Props {
    params: {
        workspacesId: string;
    }
}

const SettingsPage = async ({ params }: Props) => { 

    const user = await getCurrentUser();
    if(!user) redirect('/sign-in')

    const initialValues = await getWorkspace({workspaceId: params.workspacesId});
    if (!initialValues) redirect(`/workspaces/${params.workspacesId}`);

  return (
    <div className="">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  )
}

export default SettingsPage
