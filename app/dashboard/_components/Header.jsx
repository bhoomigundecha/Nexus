"use client";
import React from "react";
import Image from "next/image";
import { UserButton, SignOutButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HiMenu,
  HiOutlineHome,
  HiOutlineCollection,
  HiOutlineShieldCheck,
  HiOutlineLogout,     // ✔ valid logout icon
} from "react-icons/hi";

import Link from "next/link";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome className="mr-2 h-4 w-4" />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineCollection className="mr-2 h-4 w-4" />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck className="mr-2 h-4 w-4" />,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <div className="flex justify-between items-center p-5 shadow-sm bg-white">
      <Image src={"/logo.svg"} width={40} height={50} alt="Squid" />
      
      <div className="flex items-center gap-4">
        <UserButton className="bg-blue-600 hover:bg-blue-700"/>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HiMenu className="h-6 w-6 text-gray-700" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {Menu.map((item) => (
                <Link href={item.path} key={item.id}>
                  <DropdownMenuItem className="cursor-pointer">
                    {item.icon}
                    {item.name}
                  </DropdownMenuItem>
                </Link>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <SignOutButton>
                  <div className="flex items-center w-full">
                    <HiOutlineLogout className="mr-2 h-4 w-4" />
                    Logout
                  </div>
                </SignOutButton>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
