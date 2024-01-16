import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";
import "./tagMovingBg.css";
import CollectionComn from "@/components/shared/CollectionComn";
import CheckoutButton from "@/components/shared/CheckoutButton";
const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);
  // console.log(event);
  let techStackArray2: string[] = [];

  if (event.tech) {
    const techWithoutCommas = event.tech.replace(/,/g, "");
    const techStackArray = techWithoutCommas.split(" ");
    techStackArray2 = techStackArray.filter(
      (tech: string) => tech.trim() !== "",
    );
  }

  // The above code removes elements that are empty or contain only spaces

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex w-full justify-between bg-primary-50 bg-dotted-pattern bg-contain p-4">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image event photos ig"
            width={1000}
            height={1000}
            className={`${
              event.videoUrl.length < 1 ? "block " : "hidden "
            }h-full 1s min-h-[300px] border-8 border-primary-500 object-cover object-center transition-all hover:border-0`}
          />
          <div
            className={`${
              event.videoUrl.length < 1 ? "hidden " : "block "
            }h-full 1s relative min-h-[300px] border-8 border-primary-500 transition-all hover:border-0`}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src={event.videoUrl}
              title="YouTube Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex  w-full flex-col items-stretch gap-8 px-4 md:pl-8  ">
            <div className="flex flex-col gap-6 ">
              <div className="flex w-full justify-between">
                <h2 className="h2-bold">{event.title}</h2>
                <div className="flex h-fit min-w-fit justify-end ">
                  <p
                    className="p-bold-20 h-fit w-fit rounded-full 
                   bg-primary-500/10 px-5 py-2 text-primary-500"
                  >
                    {event.category.name}
                  </p>
                </div>
              </div>

              <div className="flex h-full w-full flex-wrap gap-2 overflow-visible">
                {techStackArray2
                  .filter((tech) => tech.trim() !== "") // Remove empty or space-only elements
                  .map((tech, index) => (
                    <p
                      className="tech-stack-item p-medium-16 rounded-sm px-4 py-2.5"
                      key={index}
                    >
                      {tech}
                    </p>
                  ))}
              </div>
            </div>
            {/* 💵 SUPPORT 💵 */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="p-bold-20 text-grey-600">
                  What&apos;s it about ?
                </p>
                <p className="p-medium-14 lg:p-regular-12">
                  {event.description}
                </p>
                <p className="p-medium-16 lg:p-regular-10 1s truncate text-primary-500 underline transition-all hover:text-orange-700">
                  <a href={`${event.url}`} target="_blank">
                    {event.url}
                  </a>
                </p>
              </div>
            </div>
            {/* <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
              />
              <div className="p-medium-16 lg:p-medium-16 flex flex-wrap items-center">
                <p className="mt-1">
                  {formatDateTime(event.createdAt).dateOnly}
                </p>
              </div>
            </div> */}

            <div className="flex w-full items-end justify-between">
              <CheckoutButton event={event} />

              <p
                className={`${
                  event.organizer.firstName === "Pranay" &&
                  event.organizer.lastName === "Parikh"
                    ? "hidden"
                    : "block"
                } ml-2 mt-2 sm:mt-0`}
              >
                with{" "}
                <span className="font-bold">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold ml-2">Other Similar Projects</h2>
        <CollectionComn
          data={relatedEvents?.data}
          emptyTitle="No Such Project, yet"
          emptyStateSubtext="Let's Make One :) "
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default EventDetails;
