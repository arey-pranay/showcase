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
  const isPranay = loggedInUser === "658ede8ab56bbdb15ef9bca7";

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
    <div className="group relative flex h-fit min-h-[500px] w-full flex-col overflow-hidden rounded-xl  border-primary-500 bg-white shadow-md transition-all duration-100 hover:border-none  hover:shadow-lg hover:shadow-primary-500 md:min-w-[20vw]">
      {(isEventCreator || isPranay) && (
        <div className="absolute right-2 top-2 flex flex-col rounded-xl bg-white shadow-sm transition-all ">
          <Link
            href={`/projects/${event._id}/update`}
            className="p-3 hover:rounded-t-xl hover:bg-slate-200"
          >
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
        className="flex-center h-48 border-b-0 border-primary-500 bg-primary-500 bg-contain bg-center bg-no-repeat text-grey-500 transition-all"
      />
      <Link
        href={`/projects/${event._id}`}
        className="flex  flex-col gap-3 bg-primary-50/10  p-5 md:gap-4"
      >
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-wrap justify-between gap-2">
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
              {event.title}
            </p>
            <span className="p-semibold-14 h-min w-min rounded-full bg-primary-500 px-4 py-1 text-center text-white">
              {event.category?.name}
            </span>
          </div>
          <div className="line-clamp-3"> {event.description}</div>

          <div className="mt-2 flex flex-wrap gap-2">
            {techStackArray2.map((tech: string, index: number) => (
              <p
                className=" p-medium-16 h-min rounded-sm bg-grey-50  px-4 py-2.5"
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
