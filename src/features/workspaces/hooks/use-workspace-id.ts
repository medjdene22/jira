import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
    const { workspacesId } = useParams();
    return workspacesId as string;
};