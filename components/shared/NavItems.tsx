"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathName = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathName === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive
                ? " underline underline-offset-8 text-primary-500"
                : "hover:text-gray-500 "
            } flex-center p-medium-16 whitespace-wrap transition-all 1.5s`}
          >
            <Link href={link.route}> {link.label} </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
