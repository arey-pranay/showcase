import React, { useState } from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { checkoutOrder } from "@/lib/actions/order.action";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [amount, setAmount] = useState<string>(""); // State to store the entered amount

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onCheckout = async () => {
    // Update the order object with the entered amount
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: amount, // Use the entered amount if available, otherwise use the default event price
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <div className="group flex w-24">
        <div className="flex ">
          <input
            type="text"
            id="supportInput"
            placeholder="Enter amount"
            className={`transition-all duration-300  rounded-l-md
            group-hover:w-32  w-0 ml-0 
           overflow-hidden group-hover:border-2 border-primary-500 group-hover:px-2 group-hover:py-1`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className={`transition-all duration-300 
            group-hover:w-fit  w-0 ml-0 
           overflow-hidden group-hover:border-2 rounded-r-md hover:bg-white hover-text-primary-500 active:scale-50 bg-primary-500 border-primary-500 group-hover:px-2 group-hover:py-1`}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            onClick={onCheckout}
          >
            ✔
          </button>
        </div>

        <div
          // htmlFor="supportInput"
          className={`transition-all px-4 duration-500 w-48
             group-hover:hidden group-hover:opacity-0 ml-0 opacity-100 border-2 border-primary-500 text-white bg-primary-500 rounded-lg p-1
           cursor-pointer flex gap-2`}
        >
          <h1>Support</h1>
          <h1>💰</h1>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
