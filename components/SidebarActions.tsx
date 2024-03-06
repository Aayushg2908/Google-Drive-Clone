"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useFolderModal } from "@/hooks/use-folder-modal";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useFileModal } from "@/hooks/use-file-modal";
import { FREE_TIER_LIMIT } from "@/constants";

const SidebarActions = ({ filesUploaded }: { filesUploaded: number }) => {
  const { onOpen: FolderOpen } = useFolderModal();
  const { onOpen: FileOpen } = useFileModal();
  const pathname = usePathname();

  const notAllowed = pathname === "/dashboard";

  const handleFileUpload = () => {
    if (notAllowed) {
      toast.error("File can only be uploaded inside of a Folder");
    } else if (filesUploaded >= FREE_TIER_LIMIT) {
      toast.error(
        "You have reached the limit of free tier. Upgrade to premium!"
      );
    } else {
      FileOpen();
    }
  };

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
        <DropdownMenuItem
          onSelect={handleFileUpload}
          className="cursor-pointer"
        >
          File Upload
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => FolderOpen("CREATE")}
          className="cursor-pointer"
        >
          New Folder
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarActions;
