"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";
import React from "react";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  return (
    <div>
      {" "}
      <button>liyuu (random text)</button>
    </div>
  );
};

export default CheckoutButton;
