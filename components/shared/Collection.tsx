import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { auth } from "@clerk/nextjs";
import User from "@/lib/database/models/user.model";
import Link from "next/link";
type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};
const Collection = async ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  let usefulData = data.filter((event) => {
    return event.organizer?._id === "658ede8ab56bbdb15ef9bca7";
  });

  return (
    <>
      {usefulData && usefulData.length > 0 ? (
        <div className="flex flex-col items-center gap-10 md:px-8">
          {/* {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )} */}
          <ul className="grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {usefulData.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";
              if (event.organizer?._id === "658ede8ab56bbdb15ef9bca7") {
                return (
                  <li key={event._id} className="flex justify-center">
                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  </li>
                );
              }
            })}
          </ul>
          {/* {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )} */}
        </div>
      ) : (
        <div className="flex-center mx-auto min-h-[200px] w-[90vw] flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center md:px-24">
          <h3 className="p-bold-20 md:h5-bold">
            Wow , you&apos;ve browsed all such solo projects{" "}
          </h3>
          <p className="p-regular-14">
            Feel free to{" "}
            <Link
              href={"https://pranay-firework.vercel.app/projects/create"}
              className="text-primary-500 hover:underline"
            >
              {" "}
              Propose New Projects
            </Link>{" "}
            or maybe Try{" "}
            <Link
              href={"https://pranay-firework.vercel.app"}
              className="text-primary-500 hover:underline"
            >
              {" "}
              removing all the filters
            </Link>{" "}
            .
          </p>
        </div>
      )}
    </>
  );
};

export default Collection;
