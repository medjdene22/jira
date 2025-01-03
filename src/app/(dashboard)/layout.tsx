import React from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="min-h-screen ">
      <div className="flex flex-col h-full">

        <div className="fixed left-0 top-0 hidden lg:block lg:w-64 lg:h-full overflow-x-auto ">
          <Sidebar />
        </div>

        <div className="lg:pl-64">
          <div className="mx-auto max-w-screen-2xl h-full w-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col"> 
              {children}
            </main>
          </div>
        </div>
      </div> 
    </div>
  );
}
