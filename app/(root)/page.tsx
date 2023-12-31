import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "./animateText.css";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.action";
import Collection2 from "@/components/shared/Collection2";
export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });
  console.log(events);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 px-4 overflow-x-hidden">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
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
              developer. <br /> We hope you like it :)
            </p>
            <Button className="border-2 border-primary-500 hover:bg-transparent hover:text-primary-500">
              {" "}
              <Link href="#events">Let&apos;s Go !</Link>
            </Button>
          </div>
          <div>
            <Image
              src="/assets/images/heroFW.png"
              alt="Hero Image.."
              width={1000}
              height={1000}
              className="max-h-[90vh] pt-4 object-contain object-center 2xl:max-h-[50vh]  hover:border-0 border-8 border-primary-500 transition-all 0.5s"
            />
          </div>
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8  flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold text-center">Solo Projects </h2>
        <div className="flex w-full flex-col gap-5 md:flex-col">
          Search Category <br />
          <Collection
            data={events?.data}
            emptyTitle="No Such Project, yet"
            emptyStateSubtext="Let's Make One :) "
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={2}
          />
        </div>
        <h2 className="h2-bold text-center">
          Projects Proposed By Other Developers{" "}
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-col">
          Search Category <br />
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
