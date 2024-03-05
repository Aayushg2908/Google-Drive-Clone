"use client";

import { useShareModal } from "@/hooks/use-share-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { generateNewInviteCode } from "@/actions/file";

const ShareModal = () => {
  const { file, isOpen, onClose, onOpen } = useShareModal();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setInviteUrl(`http://localhost:3000/file/share/${file?.inviteCode}`);
  }, [file?.inviteCode]);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      if (!file?.id) return;
      const data = await generateNewInviteCode(file?.id, pathname);
      if (data.status === 404) {
        toast.error("User not found");
      } else if (data.status === 403) {
        toast.error("File not found");
      } else if (data.status === 200) {
        toast.success("New link generated");
        setInviteUrl(`http://localhost:3000/file/share/${data.code}`);
      }
    } catch (error) {
      toast.error("Failed to generate a new link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-2xl text-center font-bold">
            Share file
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            File link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={onCopy}
              size="icon"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            onClick={onNew}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
