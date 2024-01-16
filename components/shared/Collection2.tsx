import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card2 from "./Card2";
import Pagination from "./Pagination";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  maxTPCVal: number;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};
const Collection2 = async ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  maxTPCVal,
  urlParamName,
}: CollectionProps) => {
  let usefulData = data.filter((event) => {
    return event.organizer?._id !== "658ede8ab56bbdb15ef9bca7";
  });

  return (
    <>
      {usefulData && usefulData.length > 0 ? (
        <div className="flex flex-col items-center gap-10 md:px-8">
          <ul className="grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {usefulData.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <li key={event._id} className="flex justify-center">
                  <Card2
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
          {maxTPCVal > 0 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={maxTPCVal}
            />
          )}
        </div>
      ) : (
        <>
          <div className="flex-center mx-auto min-h-[200px] w-[90vw] flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center md:px-24">
            <h3 className="p-bold-20 md:h5-bold">
              Oi, stop, you&apos;ve browsed all such collaborations{" "}
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
                removing filters
              </Link>{" "}
            </p>
          </div>
          {maxTPCVal > 0 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={maxTPCVal}
            />
          )}
        </>
      )}
    </>
  );
};

export default Collection2;
