"use client";

import { useFileViewerModal } from "@/hooks/use-fileviewer-modal";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { identifyContentType } from "@/lib/utils";
import Image from "next/image";
import { FileArchive } from "lucide-react";
import { toast } from "sonner";

const FileViewerModal = () => {
  const { file, isOpen, onClose } = useFileViewerModal();

  if (!file) return null;

  const getPreview = () => {
    const type = identifyContentType(file.url);

    if (type == "image") {
      return (
        <Image
          src={file.url}
          width={1080}
          height={1920}
          alt="image"
          className="max-h-[400px] w-full object-cover"
          loading="lazy"
        />
      );
    } else {
      return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4 my-10">
          <FileArchive color="black" className="h-10 w-10" />
          <p className="w-full p-2 truncate text-center">{file.name}</p>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden !gap-0">
        <div className="w-full">{getPreview()}</div>
        <DialogFooter className="bg-gray-100 px-6 py-6">
          <div className="flex items-center justify-end w-full">
            <Button>Download</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;
