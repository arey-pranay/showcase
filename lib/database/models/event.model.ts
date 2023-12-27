// import { Document } from "mongoose";
// import { Schema, model, models } from "mongoose";
// export interface IEvent extends Document {
//   _id: string;
//   title: string;
//   description: string;
//   createdAt?: Date;
//   imageUrl: string;
//   videoUrl?: string;
//   tech?: string[];
//   price?: string;
//   url?: string;
//   category?: { _id: string; name: string };
//   linkedPeople?: { _id: string; firstName: string; lastName: string };
// }
// const EventSchema = new Schema({
//   title: { type: String, required: true }, //name of project
//   description: { type: String, required: true }, //description of project
//   createdAt: { type: Date, default: Date.now }, //year and month of creation
//   imageUrl: { type: String, required: true }, //thumbnail (outside)
//   videoUrl: { type: String }, //iframe (inside)
//   tech: { type: [String] }, //convert to elements and display in a fancy manner
//   price: { type: String }, //Buy a Coffee ?
//   url: { type: String }, //deployement link
//   category: { type: Schema.Types.ObjectId, ref: "Category" }, //for filtering from outside, webpage, webapp, elm, blogs, open-source
//   linkedPeople: { type: Schema.Types.ObjectId, ref: "User" }, //to tag co-creators or github organizations
// });
// const Event = models.Event || model("Event", EventSchema);
// export default Event;
import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
