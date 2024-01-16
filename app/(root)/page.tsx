import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "./animateText.css";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.action";
import Collection2 from "@/components/shared/Collection2";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Pagination from "@/components/shared/Pagination";
export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6,
  });
  // console.log(events);
  return (
    <>
      <section className="overflow-x-hidden bg-primary-50 bg-dotted-pattern bg-contain px-8 py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="mr-10 flex flex-col justify-center gap-8">
            <h1 className="h1-bold ">
              Hola, welcome to Fire-Work by{" "}
              <span className="colorChange">Pranay Parikh </span>.{" "}
              {/* <TextTransition springConfig={presets.molasses}>
                {TEXTS[index % TEXTS.length]}
              </TextTransition> */}
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Here you can drop collab ideas for Pranay or explore all the{" "}
              <b>Lit 🔥</b> projects made by him during his journey as a web
              developer. <br /> He hopes you like it :)
            </p>
            <Button className="border-2 border-primary-500 hover:bg-transparent hover:text-primary-500">
              {" "}
              <Link href="#events">Let&apos;s Go !</Link>
            </Button>
          </div>
          <div className="flex h-full items-center justify-center ">
            <Image
              src="/assets/images/heroFW.png"
              alt="Hero Image.."
              width={1000}
              height={1000}
              className=" 0.5s my-auto max-h-[80vh] border-8 border-primary-500 object-contain object-center pt-4 transition-all hover:border-0 "
            />
          </div>
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8  flex flex-col gap-8 md:gap-0"
      >
        <div className="flex flex-col gap-4 md:mb-12 md:flex-row md:gap-8 md:px-12">
          {" "}
          <Search />
          <CategoryFilter />
        </div>

        <div className="mb-0 flex w-full flex-col gap-5 bg-primary-50 py-12 md:flex-col ">
          <div className="flex justify-center gap-12 ">
            <h2 className="h2-bold text-center">
              {" "}
              <span className="text-primary-500">Solo</span> Projects{" "}
            </h2>
            <Image
              src="/assets/images/giphy.gif"
              width={60}
              height={40}
              alt=""
              className=" border-4 border-primary-500 p-1"
            />
          </div>
          <br />
          <Collection
            data={events?.data}
            emptyTitle="No Such Project, yet"
            emptyStateSubtext="Let's Make One :) "
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={2}
          />
          <div className="mx-auto mt-12 h-2 w-[80vw] bg-gradient-to-r from-primary-500 via-primary-500/20 to-primary-500"></div>
        </div>
        <div className="mb-12 flex w-full flex-col gap-5 bg-primary-50 pb-12 pt-4 md:flex-col ">
          <div className="mb-8 flex flex-col justify-center gap-12 md:flex-row">
            <h2 className="h2-bold text-center">
              <span className="text-primary-500">C</span>ollaborations with
              {"  "}
              <span className="text-primary-500">O</span>ther{"  "}
              <span className="text-primary-500">De</span>velopers{" "}
            </h2>
            <div className="mx-auto flex w-fit justify-center border-4 border-primary-500 p-2 md:mx-0">
              <Image
                src="/assets/images/giphy.gif"
                width={42}
                height={40}
                alt=""
              />
              <Image
                src="/assets/images/giphy.gif"
                width={42}
                height={40}
                alt=""
              />
              <Image
                src="/assets/images/giphy.gif"
                width={42}
                height={40}
                alt=""
              />
              <Image
                src="/assets/images/giphy.gif"
                width={42}
                height={40}
                alt=""
              />
            </div>
          </div>
          {/* <Search /> Category <br /> */}
          <Collection2
            data={events?.data}
            emptyTitle="No Such Project, yet"
            emptyStateSubtext="Let's Make One :) "
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={2}
          />
        </div>
      </section>
    </>
  );
}
