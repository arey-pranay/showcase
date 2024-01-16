"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use the useState hook to manage isLaptop and loading state
  const [isLaptop, setIsLaptop] = useState(
    typeof window !== "undefined" && window.innerWidth < 1000,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update isLaptop state on window resize
    const handleResize = () => {
      setIsLaptop(typeof window !== "undefined" && window.innerWidth < 1000);
    };

    // Add event listener only in the browser environment
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const onClick = async (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    // Set loading to true
    setIsLoading(true);

    // Simulate an API call with a delay (you can replace this with your actual data fetching logic)

    // Scroll smoothly up by 1.7 or 2 times the window height
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: isLaptop ? window.innerHeight * 1.7 : window.innerHeight * 2,
        behavior: "smooth",
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add a small delay before pushing the new URL

    setTimeout(() => {
      // Set loading to false
      router.push(newUrl, { scroll: false });
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Loading screen */}
      {isLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-primary-500 opacity-75">
          {/* <span className="text-white">Just a sec..</span> render( */}
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      <div className="mx-auto mt-12 h-2 w-[80vw] bg-gradient-to-r from-primary-500 via-primary-500/20 to-primary-500"></div>

      <div className="flex w-full justify-between gap-2">
        <Button
          size="lg"
          variant="outline"
          className="group w-40 border-2 border-primary-500/70 text-lg text-gray-900 transition-all duration-200 hover:border-white hover:bg-primary-500/70 hover:text-white"
          onClick={() => onClick("prev")}
          disabled={Number(page) <= 1}
        >
          {" "}
          <span className="hidden group-hover:block "> &nbsp; {"<<<"} </span>
          {"<"} Prev{" "}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="group w-40 border-2 border-primary-500/70 text-lg text-gray-900 transition-all duration-200 hover:border-white hover:bg-primary-500/70 hover:text-white"
          onClick={() => onClick("next")}
          disabled={Number(page) >= totalPages}
        >
          Next &nbsp;{">"}
          <span className="hidden group-hover:block "> {">>>"} </span>
        </Button>
      </div>
    </>
  );
};

export default Pagination;
