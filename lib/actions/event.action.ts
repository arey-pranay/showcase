"use server";
import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("organizer Not Found");
    console.log("Event with this organizer is created" + organizer.username);
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: organizer,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
const getOrganizer = async (userId: string) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    return organizer;
  } catch (error) {
    console.error(error);
    return null; // or handle the error in an appropriate way
  }
};

export default getOrganizer;
