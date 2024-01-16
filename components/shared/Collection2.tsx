import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card2 from "./Card2";
import Pagination from "./Pagination";
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
const Collection2 = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,

  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data && data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 md:px-8">
          <ul className="grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";
              if (event.organizer?._id !== "658ede8ab56bbdb15ef9bca7") {
                return (
                  <li key={event._id} className="flex justify-center">
                    <Card2
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  </li>
                );
              }
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper text-centers min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection2;
