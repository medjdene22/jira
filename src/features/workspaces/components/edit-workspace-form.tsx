'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dotted } from "@/components/dotted";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUpdateWorkspace } from "../api/use-update";
import { updateWorkspaceSchema } from "../schemas";
import { Workspace } from "../type";

interface Props {
    onCancel?: () => void;
    initialValues: Workspace;
}

export function EditWorkspaceForm({ onCancel, initialValues }: Props) {

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ??  "",
        },
        resolver: zodResolver(updateWorkspaceSchema),
    });

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const { mutate, isPending} = useUpdateWorkspace();
    const onSubmit = (data: z.infer<typeof updateWorkspaceSchema>) => {
        const finalData = {
            ...data,
            image: data.image instanceof File ? data.image : data.image ?? "",
        };
        console.log(finalData);
        mutate({form: finalData, param: {workspaceId: initialValues.$id}},{
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
            <CardHeader className="flex flex-row items-center gap-x-8 p-7 space-y-0">
                <Button size={'sm'} variant={'secondary'} onClick={onCancel ? onCancel : () => router.back()}>
                    <ArrowLeftIcon className="sise-4" />
                    Back
                </Button>
                <CardTitle className="text-xl font-bold">{initialValues.name}</CardTitle>
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
                                            {field.value ? (
                                            <Button disabled={isPending} type="button" variant="destructive" size={"xs"} className="w-fit mt-2" onClick={() => {
                                                field.onChange(null);
                                                if (inputRef.current) inputRef.current.value = "";
                                                form.setValue("image", "")
                                            }}>
                                                Remove Image 
                                            </Button>) : (
                                            <Button disabled={isPending} type="button" variant="teritory" size={"sm"} className="w-fit mt-2" onClick={() => inputRef.current?.click()}>
                                                Upload Image
                                            </Button>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}/>

                        </div>
                        <Dotted className="py-4"/>
                        <div className="flex items-center w-full justify-between"> 
                            <Button type="button" disabled={isPending} variant="secondary" size={"lg"} onClick={onCancel} className={cn(!onCancel && 'invisible')}>Cancel</Button>   
                            <Button disabled={isPending} type="submit" size={"lg"} >Save changes</Button>
                        </div>
                        
                    </form> 
                </Form>    
            </CardContent>
        </Card> 
    )

}    