import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { createWorkspaceSchema, updateWorkspaceSchema } from "./schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "../members/type";
import { generateInviteCode } from "@/lib/utils";
import { getMembers } from "../members/utils";
import { error } from "console";


const app = new Hono()
    .get("/", sessionMiddleware, async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal("userId", user.$id)]
        );
        if (members.total === 0) {
            return c.json({ data: { documents: [], total: 0 } });
        }

        const workspacesIds = members.documents.map((member) => member.workspaceId);

        
        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACE_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id", workspacesIds)
            ]
        );
        
        
        return c.json({ data: workspaces });
    })

    .post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware,async (c) => {

        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");
        const { name, image } = c.req.valid("form"); 

        let uploadedImageUrl: string | undefined;
        if (image instanceof File) {
            
            const file = await storage.createFile(
                IMAGES_ID,
                ID.unique(),
                image,
            );

            const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
            
            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        }

        const workspace = await databases.createDocument(
            DATABASE_ID,
            WORKSPACE_ID,
            ID.unique(),
            {
                name,
                userid: user.$id,
                imageUrl: uploadedImageUrl,
                inviteCode: generateInviteCode(10),
            }
        );
        await databases.createDocument(
            DATABASE_ID,
            MEMBERS_ID,
            ID.unique(),
            {
                userId: user.$id,
                workspaceId: workspace.$id,
                role: MemberRole.Admin,
            }
        );
        return c.json({ data: workspace });
    })

    .patch("/:workspaceId", zValidator("form", updateWorkspaceSchema), sessionMiddleware, async (c) => {

        const databases = c.get("databases");
        const user = c.get("user");
        const storage = c.get("storage");

        const { workspaceId } = c.req.param();
        const { name, image } = c.req.valid("form");

        const member = await getMembers({userId: user.$id, workspaceId, databases});
        if (!member || member.role !== MemberRole.Admin) {
            return c.json({ error: "You are not authorized to perform this action" }, 401 );
        }

        let uploadedImageUrl: string | undefined;
        if (image instanceof File) {
            
            const file = await storage.createFile(
                IMAGES_ID,
                ID.unique(),
                image,
            );

            const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
        } else uploadedImageUrl = image;

        const workspace = await databases.updateDocument(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId,
            {
                name,
                imageUrl: uploadedImageUrl,
            }
        );
        return c.json({ data: workspace });
    })
    ;

export default app;