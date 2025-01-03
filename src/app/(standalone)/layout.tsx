import React from "react";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@/features/auth/components/user-button";


export default function StandAloneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <main className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 ">

          <nav className="flex items-center justify-between h-20">
            <Link href="/" className="text-neutral-500 hover:text-neutral-700">
              <Image
                src="/logo.svg"
                alt="Jira"
                width={152}
                height={56}
              />
            </Link>
            <UserButton />
          </nav>
          <div className="flex py-4 flex-col items-center justify-center">
            {children}
          </div>

        </div>   
    </main>
  );
}
