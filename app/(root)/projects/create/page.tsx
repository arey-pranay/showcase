import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  // console.log(userId);
  // if (!userId) {
  //   <div className="flex h-full w-full items-center justify-center">
  //     {" "}
  //     <div className="flex flex-col items-center justify-center py-4 ">
  //       <h1>
  //         Contact{" "}
  //         <a
  //           href="https://www.linkedin.com/in/pranay-parikh-530331218/"
  //           className="text-primary-500 hover:underline hover:underline-offset-1"
  //           target="_blank"
  //         >
  //           Pranay
  //         </a>{" "}
  //         if your info is not visible, He might be moving things around
  //       </h1>
  //       <br />
  //       <Image
  //         src="/assets/images/oneWork.gif"
  //         width={300}
  //         height={300}
  //         alt=""
  //         className=" border-4 border-primary-500 p-1"
  //       />
  //       <br />
  //       <p>
  //         It&apos;s supposed to look like{" "}
  //         <a
  //           className="text-primary-500 underline underline-offset-4 transition-all duration-200 hover:underline-offset-2"
  //           href="https://www.linkedin.com/in/pranay-parikh-530331218/"
  //           target="_blank"
  //         >
  //           this
  //         </a>
  //       </p>
  //     </div>
  //   </div>;
  // }
  // console.log(userId);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-2 ">
        <h3 className="wrapper h3-bold text-center ">Create Project</h3>
      </section>
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};
export default CreateEvent;
