"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";

import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
// import CreateEvent from "@/app/(root)/events/create/page";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  userId: string;
  event?: IEvent;
  eventId?: string;
  type: "Create" | "Update";
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Update"
      ? { ...event, createdAt: new Date(event.createdAt) }
      : eventDefaultValues;
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;
      uploadedImageUrl = uploadedImages[0].url;
    }
    if (type === "Create") {
      try {
        if (!userId) {
          // alert("bruh no user !");
          form.reset();
          router.push(`/profile`);
          // return (
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
          //         if your info is not visible here, He might be moving things
          //         around
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
          //   </div>
          // );
        }
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/projects/${newEvent._id}`);
        }
      } catch (error) {
        // console.log(error);
      }
    }
    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          userId,
          path: `/projects/${eventId}`,
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/projects/${updatedEvent._id}`);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-4xl flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Project Name"
                    {...field}
                    className="input-field"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72"></FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[56px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar icon"
                      height={24}
                      width={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 pointer-events-none whitespace-nowrap text-gray-600">
                      Start Date:{" "}
                    </p>
                    <DatePicker
                      className="cursor-pointer caret-transparent hover:opacity-50"
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[56px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/rupee.png"
                      alt="money charged"
                      height={4}
                      width={10}
                      className="filter-grey"
                    />
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onKeyPress={(e) => {
                        const isNumber = /\d/.test(e.key);
                        if (!isNumber) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline outline-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="tech"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[56px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/tech-stackk.svg"
                      alt="tech stacks"
                      height={24}
                      width={24}
                      className="opacity-60"
                    />
                    <Input
                      placeholder=" *Tech Stack* like CSS, JS, jetpack-compose, tailwind-css whatever"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[56px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="video link"
                      height={24}
                      width={24}
                    />
                    <Input
                      placeholder="Enter the video URL (if any)"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[56px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="deployed link"
                      height={24}
                      width={24}
                    />
                    <Input
                      placeholder="Enter the deployment URL (if any)"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting" : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};
export default EventForm;
