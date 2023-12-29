export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  // location: "",
  imageUrl: "",
  createdAt: new Date(),
  // endDateTime: new Date(),
  videoUrl: "",
  tech: "",
  categoryId: "",
  price: "",
  // isFree: false,
  url: "",
  // organizer: "",
};
