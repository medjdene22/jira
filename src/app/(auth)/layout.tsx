'use client';

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";



  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
            
            <Image src="/logo.svg" alt="logo" width={152} height={56} />
            <Button asChild variant="secondary" >
              <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
                {isSignUp ? "Login" : "Sign up"}
              </Link>
            </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-8 md:pt-14 ">
          {children}
        </div>
        
      </div>
        
    </main>
  );
}
