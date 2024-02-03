import CollectionComn from "@/components/shared/CollectionComn";
import { Button } from "@/components/ui/button";
import { getEventById, getEventsByUser } from "@/lib/actions/event.action";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  // console.log(sessionClaims);

  const userId = sessionClaims?.userId as string;
  if (!userId) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {" "}
        <div className="flex flex-col items-center justify-center py-4 ">
          <div className="flex flex-col text-center md:flex-row">
            {" "}
            <h1>
              Contact{" "}
              <a
                href="https://www.linkedin.com/in/pranay-parikh-530331218/"
                className="text-primary-500 hover:underline hover:underline-offset-1"
                target="_blank"
              >
                Pranay
              </a>{" "}
              if your info/project is not visible{" "}
            </h1>
            <p className="hidden md:block">,&nbsp;</p>
            <p>He might be moving things around</p>
          </div>

          <br />
          <Image
            src="/assets/images/oneWork.gif"
            width={300}
            height={300}
            alt=""
            className=" border-4 border-primary-500 p-1 transition-all duration-200 hover:p-2"
          />
          <br />
          <p>
            It&apos;s supposed to look like{" "}
            <a
              className="text-primary-500 underline underline-offset-4 transition-all duration-200 hover:underline-offset-2"
              href="https://www.linkedin.com/posts/pranay-parikh-530331218_firework-just-like-the-website-activity-7159058417695760385-sZIb?utm_source=share&utm_medium=member_desktop"
              target="_blank"
            >
              this
            </a>
          </p>
        </div>
      </div>
    );
  }
  const userData = await User.findById(userId);
  const firstName = userData.firstName;
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event || []);
  // console.log(orderedEvents);
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
