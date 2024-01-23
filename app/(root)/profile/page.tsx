import CollectionComn from "@/components/shared/CollectionComn";
import { Button } from "@/components/ui/button";
import { getEventById, getEventsByUser } from "@/lib/actions/event.action";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userData = await User.findById(userId);
  const firstName = userData.firstName;
  // console.log(firstName);
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event || []);
  console.log(orderedEvents);
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center px-12 md:justify-around">
          <h3 className="h3-bold text-center">
            Pranay &nbsp; X &nbsp;{" "}
            <span className="text-primary-500">{firstName}</span>
          </h3>
          <Button
            asChild
            className="hidden border-2 border-primary-500 bg-white text-primary-500 hover:text-white md:flex"
          >
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
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex w-full  items-center justify-center md:justify-around">
          <h3 className="h3-bold text-center">Projects That You Have Funded</h3>
          <Button
            asChild
            className="hidden border-2 border-primary-500 hover:bg-white hover:text-primary-500 md:flex"
          >
            <Link href="/projects">Support More Projects</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        {" "}
        <CollectionComn
          data={orderedEvents}
          emptyTitle="No Projects Supported Yet"
          emptyStateSubtext="Let's find a project that you'll like ?"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="orderPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
