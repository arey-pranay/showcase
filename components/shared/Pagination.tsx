"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};
const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex w-full justify-between gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        <span className="hidden group-hover:block "> &nbsp; {"<<<"} </span>{" "}
        Previous{" "}
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28 hover:bg-primary-500/70 text-gray-900 group transition-all duration-200 border-2 border-primary-500/70 hover:text-white hover:border-white"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next &nbsp;{">"}
        <span className="hidden group-hover:block "> {">>>"} </span>
      </Button>
    </div>
  );
};

export default Pagination;
