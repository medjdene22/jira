import { Query, type Databases } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { MemberRole } from "./type";

interface Props {
    userId: string;
    workspaceId: string;
    databases: Databases;
}

export const getMembers = async ({userId, workspaceId, databases}: Props) => {
    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [
            Query.equal("workspaceId", workspaceId),
            Query.equal("userId", userId),
        ]
    );
    return members.documents[0];
};

