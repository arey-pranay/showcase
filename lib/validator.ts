import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Oi! Put at least 3 character na"),
  description: z
    .string()
    .min(3, "What kinda description it this hn ? At least put 10 characters"),
  createdAt: z.date(),
  imageUrl: z.string(),
  videoUrl: z.string(),
  tech: z.string(),
  price: z.string(),
  url: z.string(),
  categoryId: z.string(),
  // organizer: z.string(),
});
