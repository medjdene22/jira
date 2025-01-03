'use client'
import ResponsiveModel from "@/components/responsive-model";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModel } from "../hooks/use-create-workspace-model";

export default function CreateWorkspaceModel() {
    const { isOpen, setIsOpen, onClose } = useCreateWorkspaceModel();


    return (
        <ResponsiveModel isOpen={isOpen} onOpencChange={setIsOpen} >
            <CreateWorkspaceForm onCancel={onClose} />
        </ResponsiveModel>
    )
}