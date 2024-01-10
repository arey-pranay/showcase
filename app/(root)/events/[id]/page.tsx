import { getEventById } from "@/lib/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";
import "./tagMovingBg.css";
const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  // console.log(event);
  const techWithoutCommas = event.tech.replace(/,/g, "");
  const techStackArray = techWithoutCommas.split(" ");

  return (
    <section className="flex w-full p-4 justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          alt="hero image event photos ig"
          width={1000}
          height={1000}
          className={`${
            event.videoUrl.length < 1 ? "block " : "hidden "
          }h-full min-h-[300px] object-cover object-center border-8 hover:border-0 transition-all 1s border-primary-500`}
        />
        <div
          className={`${
            event.videoUrl.length < 1 ? "hidden " : "block "
          }h-full min-h-[300px] relative border-8 hover:border-0 transition-all 1s border-primary-500`}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={event.videoUrl}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between w-full">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  {/* <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {`Rs. ${event.price}`}
                </p> */}
                  <p className="p-bold-20 rounded-full bg-primary-500/10 px-5 py-2 text-primary-500">
                    {event.category.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 overflow-visible h-full w-full">
              {techStackArray.map((tech: string, index: string) => (
                <p
                  className="tech-stack-item p-medium-16 rounded-sm   px-4 py-2.5  "
                  key={index}
                >
                  {tech}
                </p>
              ))}
            </div>
            <p
              className={`${
                event.organizer.firstName === "Pranay" &&
                event.organizer.lastName === "Parikh"
                  ? "hidden"
                  : "block"
              } ml-2 mt-2 sm:mt-0`}
            >
              proposed by{" "}
              <span className="font-bold">
                {event.organizer.firstName} {event.organizer.lastName}
              </span>
            </p>
          </div>
          {/* 💵 SUPPORT 💵 */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What&apos;s it about ?</p>
              <p className="p-medium-14 lg:p-regular-12">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline hover:scale-90 hover:text-orange-700 hover:-translate-x-7 transition-all 1s">
                <a href={`${event.url}`} target="_blank">
                  {event.url}
                </a>
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={20}
              height={20}
            />
            <div className="p-medium-16 lg:p-medium-16 flex flex-wrap items-center">
              <p className="mt-1">{formatDateTime(event.createdAt).dateOnly}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
