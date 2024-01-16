import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import React from "react";

const FirstN = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userData = await User.findById(userId);
  const firstName = userData.firstName;
  return (
    <h1 className="h1-bold">
      Hola <span className="colorChange2">{firstName}</span>,
    </h1>
  );
};

export default FirstN;
