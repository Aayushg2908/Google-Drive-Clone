"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SidebarActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[70%] lg:w-[50%] flex justify-start gap-2 rounded-2xl shadow-xl"
        >
          <Plus className="w-5 h-5 text-slate-800" />
          <p>New</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1">
        <DropdownMenuItem className="cursor-pointer">
          File Upload
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          New Folder
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarActions;
