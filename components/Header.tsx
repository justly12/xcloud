import Link from "next/link"
import Image from 'next/image';

import { SignInButton,  SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ThemeChanger } from "./ThemeChanger";
import { UserCircle } from "lucide-react";

function Header() {
  return (
    <header className=" flex items-center justify-between">
       <Link href={"/"} className="flex items-end p-4 space-x-1">
        <Image
         src="/images/logo.png"
         className="invert"
         height={50}
         width={50}
         alt="Cloud Logo"
         />
           <h2 className="font-bold text-xl">Cloud</h2>
       </Link>

       <div className="flex items-center space-x-1 p-3">
        {/*Theme togler*/}
        <ThemeChanger/>

        <UserButton afterSignOutUrl="/"/>

        <SignedOut>
          <div className="flex items-center p-2 px-5 space-x-3" >  
            <Button variant="outline" className="space-x-2">
              <UserCircle />
              <SignInButton afterSignInUrl="/dashboard" mode='modal' /> 
              
            </Button>
            
            
                       
            
          </div>
        </SignedOut>

       </div>
    </header>
  )
}

export default Header
