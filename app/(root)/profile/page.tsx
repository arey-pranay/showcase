import CollectionComn from "@/components/shared/CollectionComn";
import { Button } from "@/components/ui/button";
import { getEventById, getEventsByUser } from "@/lib/actions/event.action";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userData = await User.findById(userId);
  const firstName = userData.firstName;
  // console.log(firstName);
  const organizedEvents = await getEventsByUser({ userId, page: 1 });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex px-12 items-center justify-center md:justify-around">
          <h3 className="h3-bold text-center">
            Pranay &nbsp; X &nbsp; {firstName}
          </h3>
          <Button asChild className="hidden md:flex">
            <Link href="/projects/create">Let&apos; Propose a Project</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <CollectionComn
          data={organizedEvents?.data}
          emptyTitle="No Projects Supported Yet"
          emptyStateSubtext="Let's find a project that you'll like ?"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="orderPage"
          totalPages={2}
        />
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex w-full  items-center justify-center md:justify-around">
          <h3 className="h3-bold text-center">Projects That You Have Funded</h3>
          <Button asChild className="hidden md:flex">
            <Link href="/projects">Support More Projects</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        {" "}
        {/* <CollectionComn
          data={organizedEvents?.data}
          emptyTitle="No Projects Supported Yet"
          emptyStateSubtext="Let's find a project that you'll like ?"
          collect ionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="orderPage"
          totalPages={2}
        /> */}
      </section>
    </>
  );
};

export default ProfilePage;