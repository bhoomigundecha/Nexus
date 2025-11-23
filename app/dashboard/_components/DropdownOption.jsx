"use client";

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineTrash } from "react-icons/hi2";

const DropdownOption = ({ children, handleDelete, courseId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent>
        <DropdownMenuItem 
          onClick={handleDelete}
          className="flex items-center gap-2 text-red-600 cursor-pointer"
        >
          <HiOutlineTrash className="h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownOption;