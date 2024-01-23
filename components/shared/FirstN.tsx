import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import React from "react";

const FirstN = async () => {
  const { sessionClaims } = auth();
  console.log(sessionClaims);

  const userId = sessionClaims?.userId as string;
  console.log("userId" + userId);
  const userData = await User.findById(userId);
  console.log(userData);
  // const firstName = userData.firstName;
  return (
    <h1 className="h1-bold">
      Hola <span className="colorChange2">g</span>,
    </h1>
  );
};

export default FirstN;
