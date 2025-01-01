'use client'

import { Dotted } from "@/components/dotted";
import { Button } from "@/components/ui/button";
import { FcGoogle} from "react-icons/fc"
import { FaGithub} from "react-icons/fa"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";

import{
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rejesterSchema } from "../schemas";
import { useRegester } from "../api/use-regester";


export const SignUpCard = () => {

  const form = useForm<z.infer<typeof rejesterSchema>>({
    resolver: zodResolver(rejesterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useRegester();

  const onSubmit = (data: z.infer<typeof rejesterSchema>) => {
    mutate({json: data});
  }


  return (
    <Card className="w-full h-full md:w-[487px] shadow-none border-none"> 
      <CardHeader className="flex items-center justify-between p-7">
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription className="text-center">
          By signing up, you agree to our{" "} 
          <Link href="#"> <span className="text-blue-700 hover:underline">Privacy Policy</span></Link>{" and "}
          <Link href="#"> <span className="text-blue-700 hover:underline">Terms of Service</span></Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7 ">
        <Dotted direction="horizontal"/>
      </div>
      <CardContent className="p-7">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isPending} type="text" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isPending} type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isPending} type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}/>
              <Button disabled={isPending} type="submit" size={"lg"} className="w-full">Sign up</Button>
            </form>
        </Form>
      </CardContent>
      <div  className="px-7">
        <Dotted direction="horizontal"/>
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button disabled={false} variant="secondary" size={"lg"} className="w-full">
          <FcGoogle className="mr-2 size-5"/>
          Sign up with Google
        </Button>
        <Button disabled={false} variant="secondary" size={"lg"} className="w-full">
          <FaGithub className="mr-2 size-5"/>
          Sign up with GitHub
        </Button>
      </CardContent>
      <div  className="px-7">
        <Dotted direction="horizontal"/>
      </div>
      <CardFooter className="p-7 flex items-center justify-center">
          <Link href={"/sign-in"}>
           you do have account? <span className="text-blue-700 hover:underline">Login</span>
          </Link>
      </CardFooter>
    </Card>
  )
}
