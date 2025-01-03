'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateWorkspace } from "../api/use-create";

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dotted } from "@/components/dotted";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
    onCancel?: () => void;
}

export function CreateWorkspaceForm({ onCancel }: Props) {

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        defaultValues: {
            name: "",
            image: "",
        },
        resolver: zodResolver(createWorkspaceSchema),
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const { mutate, isPending} = useCreateWorkspace();

    const router = useRouter();

    const onSubmit = (data: z.infer<typeof createWorkspaceSchema>) => {
        const finalData = {
            ...data,
            image: data.image instanceof File ? data.image : "" ,
        };


        mutate({form: finalData},{
            onSuccess: ({data}) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`)
            },
            
        });
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(typeof file);
        if (file) {
            form.setValue("image", file);
        }
    };


    return (
        <Card className="w-full h-full md:w-[487px] shadow-none border-none"> 
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">Create a new workspace</CardTitle>
            </CardHeader>
            <div className="px-7 ">
                <Dotted />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="flex flex-col gap-y-4">
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Workspace name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="text" placeholder="Enter workspace name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="image" render={({field}) => (
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex items-center gap-x-5">
                                        {field.value ? ( 
                                            <div className="size-[72px] relative rounded-md overflow-hidden ">
                                                <Image src={field.value instanceof File
                                                    ? URL.createObjectURL(field.value)
                                                    : field.value
                                                    } 
                                                alt={"logo"} fill className="object-cover"/>
                                            </div>
                                        ) : (
                                            <Avatar className="size-[72px]" >
                                                <AvatarFallback>
                                                    <ImageIcon className="size-9 text-neutral-500" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium">workspace icon</p>
                                            <p className="text-sm text-muted-foreground">JPG, PNG, SVG or JPEG up to 2MB</p>
                                            <input disabled={isPending} ref={inputRef} type="file" accept=".jpg, .png, .jpeg, svg" className="hidden" onChange={handleImageChange} />
                                            <Button disabled={isPending} type="button" variant="teritory" size={"sm"} className="w-fit mt-2" onClick={() => inputRef.current?.click()}>
                                                Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}/>

                        </div>
                        <Dotted className="py-4"/>
                        <div className="flex items-center w-full justify-between"> 
                            <Button type="button" disabled={isPending} variant="secondary" size={"lg"} onClick={onCancel} className={cn(!onCancel && 'invisible')}>Cancel</Button>   
                            <Button disabled={isPending} type="submit" size={"lg"} >Create Workspace</Button>
                        </div>
                        
                    </form> 
                </Form>    
            </CardContent>
        </Card> 
    )

}    