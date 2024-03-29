import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  // console.log(userId);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 mf:py-10 ">
        <h1 className="wrapper h3-bold text-center ">Update Event</h1>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          event={event}
          eventId={event._id}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;
