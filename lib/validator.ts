// "use server";
import * as z from "zod";
import { connectToDatabase } from "./database";
import { auth } from "@clerk/nextjs";
import User from "./database/models/user.model";
// import getOrganizer from "./actions/event.action";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Oi! Put at least 3 character na"),
  description: z
    .string()
    .min(5, "What kinda description it this hn ? At least put 5 characters"),
  // createdAt: z.date(),
  imageUrl: z.string(),
  videoUrl: z.string(),
  tech: z.string(),
  // price: z.string().max(5, "Ain't that a lil too much ?"),
  url: z.string(),
  categoryId: z.string(),
});
