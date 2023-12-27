import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <div className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36 ml-2 sm:ml-10">
          <Image
            src="assets/images/logoFW.svg"
            width={64}
            height={32}
            alt="Logo"
          />
        </Link>
        <SignedIn>
          <div className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </div>
        </SignedIn>
        <div className="flex items-center gap-4 md:pr-8">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="rounded-full mr-4 bg-orange-400 border-2 border-orange-400 hover:bg-white hover:text-orange-400"
              size="lg"
            >
              <Link href="/sign-in" className="">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
