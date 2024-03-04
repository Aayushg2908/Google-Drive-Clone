"use client";

import { deleteFolder } from "@/actions/folder";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFolderModal } from "@/hooks/use-folder-modal";
import { FolderIcon, MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const Folder = ({ name, id }: { name: string; id: string }) => {
  const { onOpen } = useFolderModal();

  const handleDelete = async () => {
    try {
      const data = await deleteFolder(id);
      if (data.status === 404) {
        toast.error("User not found");
      } else {
        toast.success("Folder deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete folder");
    }
  };

  return (
    <Link
      href={`/dashboard/folder/${id}`}
      className="flex hover:bg-[#E1E5EA] bg-[#EDF2FC] items-center justify-between p-2 rounded-md cursor-pointer transition-colors"
    >
      <div className="flex gap-2 justify-center items-center">
        <FolderIcon
          size={28}
          color="#5F6368"
          className="fill-[#5F6368]"
          strokeWidth={3}
        />
        <p className="text-[#5F6368] text-sm font-medium truncate">{name}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="transparent">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => onOpen("UPDATE", name, id)}
              className="cursor-pointer flex gap-1 items-center hover:bg-slate-200 p-2 pl-4 text-sm rounded-md"
            >
              <Pencil className="h-4 w-4 text-slate-600" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleDelete}
              className="cursor-pointer flex gap-1 items-center hover:bg-slate-200 p-2 pl-4 text-sm rounded-md"
            >
              <Trash className="h-4 w-4 text-slate-600" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
};

export default Folder;
