"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";
import Like from "./Like";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  return (
    <div>
      <SignedOut>
        <Button asChild className="button rounded-full" size="lg">
          <Link href="/sign-in">
            {" "}
            <Button></Button>
          </Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="flex gap-4">
          <Checkout event={event} userId={userId} />
          {/* <Like event={event} userId={userId} /> */}
        </div>
      </SignedIn>
    </div>
  );
};

export default CheckoutButton;
