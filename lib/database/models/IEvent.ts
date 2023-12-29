import { Document } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  createdAt?: Date;
  imageUrl: string;
  videoUrl?: string;
  tech?: string;
  // orgUser?: string;
  price?: string;
  url?: string;
  category?: { _id: string; name: string };

  organizer?: { _id: string; firstName: string; lastName: string };
}
