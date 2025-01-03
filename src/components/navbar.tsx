
import { UserButton } from "@/features/auth/components/user-button";
import MSidebar from "./m-sidebar";


export default function Navbar() {

  return (
    <nav className="pt-4 px-5 flex items-center justify-between">
        <div className="flex-col hidden lg:flex">
            <h1 className="text-2xl font-semibold">Home</h1>
            <p className="text-muted-foreground">Montor all of your projects and tasks here</p>
        </div>
        <MSidebar/>
        <UserButton />
        
    </nav >
  )
}
