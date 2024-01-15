import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const loggedInUser = sessionClaims?.userId as string;
  const isEventCreator = loggedInUser === event.organizer?._id.toString();

  let techStackArray2: string[] = [];

  if (event.tech) {
    const techWithoutCommas = event.tech.replace(/,/g, "");
    const techStackArray = techWithoutCommas.split(" ");
    techStackArray2 = techStackArray.filter((tech) => tech.trim() !== "");
  }

  // let techStackArray: string[] = ["a", "b", "c", "d"];

  // if (event.tech) {
  //   const techWithoutCommas = event.tech.replace(/,/g, "");
  //   const filteredArray = techWithoutCommas.split(" ");
  //   // Assuming techStackArray is your array
  // const techStackArray = filteredArray.filter((tech) => tech.trim() !== "");
  // }

  return (
    <div className="group border-2 border-primary-500 relative flex w-full min-h-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-100 hover:shadow-lg h-[10vh]  hover:shadow-primary-500 md:min-w-[30vw] hover:border-none">
      {isEventCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/projects/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <Link
        href={`/projects/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center h-48 bg-contain bg-center border-b-0 bg-primary-500 border-primary-500 transition-all bg-no-repeat text-grey-500"
      />
      <Link
        href={`/projects/${event._id}`}
        className="flex  flex-col gap-3 bg-primary-50/10  p-5 md:gap-4"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 justify-between w-full">
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
              {event.title}
            </p>
            <span className="p-semibold-14 w-min rounded-full text-center bg-primary-500 text-white px-4 py-1">
              {event.category?.name}
            </span>
          </div>
          {event.description}
          <div className="flex flex-wrap gap-2 h-full">
            {techStackArray2.map((tech: string, index: number) => (
              <p
                className="tech-stack-item my-1 p-medium-16 rounded-sm bg-grey-50  px-4 py-2.5"
                key={index}
              >
                {tech}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
