"use client";

import { useFileModal } from "@/hooks/use-file-modal";
import { Dialog, DialogContent } from "./ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { uploadFile } from "@/actions/file";

const FileModal = () => {
  const { isOpen, onClose } = useFileModal();
  const pathname = usePathname();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <UploadDropzone
          endpoint="fileUploader"
          onClientUploadComplete={async (res) => {
            const paths = pathname.split("/");
            const folderId = paths[paths.length - 1];

            onClose();

            try {
              const data = await uploadFile({
                name: res[0].name,
                url: res[0].url,
                folderId,
              });

              if (data.status === 404) {
                toast.error("User not found");
              } else if (data.status === 400) {
                toast.error("Folder not found");
              } else if (data.status === 200) {
                toast.success("File uploaded successfully");
              }
            } catch (error) {
              toast.error("Something went wrong");
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileModal;
