import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center  flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="assets/images/logoFW.svg"
            alt="logo"
            width={64}
            height={48}
          />
        </Link>
        <p>Made with 🧠 & 💖 by Pranay Parikh</p>
      </div>
    </footer>
  );
};

export default Footer;
