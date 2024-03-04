"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFolderModal } from "@/hooks/use-folder-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { createFolder, updateFolder } from "@/actions/folder";

const formSchema = z.object({
  name: z.string().min(1, { message: "Folder name is required" }),
});

const FolderModal = () => {
  const { type, folderId, name, isOpen, onClose } = useFolderModal();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
    },
  });

  useEffect(() => {
    if (name) {
      form.reset({
        name: name || "",
      });
    }
  }, [name, form]);

  const onSubmit = async (value: { name: string }) => {
    try {
      setIsLoading(true);
      const isFolderRoute = pathname.includes("/folder/");
      if (type === "CREATE") {
        let parentId = undefined;
        if (isFolderRoute) {
          const paths = pathname.split("/");
          parentId = paths?.[paths.length - 1];
        }
        const data = await createFolder(value.name, parentId);
        if (data.status === 404) {
          toast.error("User not found");
        } else if (data.status === 403) {
          toast.error("Free tier limit reached. Upgrade to premium");
        } else if (data.status === 200) {
          toast.success("Folder created successfully");
        }
      } else {
        const data = await updateFolder(folderId, value.name);
        if (data.status === 404) {
          toast.error("User not found");
        } else {
          toast.success("Folder updated successfully");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      onClose();
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {type === "CREATE" ? "Create Folder" : "Edit Folder"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Folder name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={false}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter folder name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage />
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="default">
                {type === "CREATE" ? "Create" : "Edit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FolderModal;
