"use client";

import { identifyContentType } from "@/lib/utils";
import { File } from "@prisma/client";
import {
  FileArchive,
  FileImage,
  Forward,
  MoreVertical,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { deleteFile } from "@/actions/file";
import { useShareModal } from "@/hooks/use-share-modal";
import { useFileViewerModal } from "@/hooks/use-fileviewer-modal";

interface FileProps {
  file: File;
  isOwner: boolean;
}

const FileIcon = {
  image: <FileImage className="h-5 w-5" color="#D93025" strokeWidth={2} />,
  other: <FileArchive className="h-5 w-5" color="#D93025" strokeWidth={2} />,
};

const File = ({ file, isOwner }: FileProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useShareModal();
  const { onOpen: fileViewer } = useFileViewerModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    try {
      const data = await deleteFile(file.id, file.folderId);
      if (data.status === 404) {
        toast.error("User not found");
      } else if (data.status === 403) {
        toast.error("File not found");
      } else {
        toast.success("File deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  const getPreview = () => {
    const type = identifyContentType(file.url);

    if (type == "image") {
      return (
        <Image
          src={file.url}
          width={1080}
          height={1920}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      );
    } else {
      return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-5">
          <FileArchive color="black" className="h-10 w-10" />
          <p className="w-full p-2 truncate text-center">{file.name}</p>
        </div>
      );
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-xs mx-auto cursor-pointer hover:bg-[#E1E5EA] bg-[#EDF2FC] rounded-md overflow-hidden shadow-md">
      <div className="p-4 flex justify-start items-center gap-1 relative">
        {FileIcon[identifyContentType(file.url)]}
        <h1 className="text-[#5F6368] text-sm font-medium w-[75%] truncate">
          {file.name}
        </h1>
        {isOwner && file.id && (
          <div className="absolute right-0">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="transparent">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-1">
                <DropdownMenuItem
                  onSelect={() => onOpen(file)}
                  className="cursor-pointer"
                >
                  <Forward className="h-4 w-4 text-slate-600 mr-1" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleDelete}
                  className="cursor-pointer"
                >
                  <Trash className="h-4 w-4 text-slate-600 mr-1" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="w-full h-[200px] p-1" onClick={() => fileViewer(file)}>
        {getPreview()}
      </div>
    </div>
  );
};

export default File;
