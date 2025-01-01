'use client'

import { Dotted } from "@/components/dotted";
import { Button } from "@/components/ui/button";
import { FcGoogle} from "react-icons/fc"
import { FaGithub} from "react-icons/fa"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import{
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";


export const SignInCard = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending} = useLogin();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate({json: data});
  }

  return (
    <Card className="w-full h-full md:w-[487px] shadow-none border-none"> 
      <CardHeader className="flex items-center justify-between p-7">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
      </CardHeader>
      <div className="px-7 ">
        <Dotted direction="horizontal"/>
      </div> 
      <CardContent className="p-7">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              )}
              />
              <Button disabled={isPending} type="submit" size={"lg"} className="w-full">Log In</Button>
            
            </form> 
        </Form>    
      </CardContent>
      <div  className="px-7">
        <Dotted direction="horizontal"/>
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button disabled={isPending} variant="secondary" size={"lg"} className="w-full">
          <FcGoogle className="mr-2 size-5"/>
          Login with Google
        </Button>
        <Button disabled={isPending} variant="secondary" size={"lg"} className="w-full">
          <FaGithub className="mr-2 size-5"/>
          Login with GitHub
        </Button>
      </CardContent>
      <div  className="px-7">
        <Dotted direction="horizontal"/>
      </div>
      <CardFooter className="p-7 flex items-center justify-center">
          <Link href={"/sign-up"}>
            Don&apos;t have an account? <span className="text-blue-700 hover:underline">Sign up</span>
          </Link>
      </CardFooter>
    </Card>
  )
}


