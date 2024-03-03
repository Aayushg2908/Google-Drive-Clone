import { Folder } from "@prisma/client";
import { create } from "zustand";

type Action = "CREATE" | "UPDATE";

interface FolderModalState {
  type: Action;
  folderId: string;
  name: string;
  isOpen: boolean;
  onOpen: (type: Action, name?: string, folderId?: string) => void;
  onClose: () => void;
}

export const useFolderModal = create<FolderModalState>((set) => ({
  type: "CREATE",
  folderId: "",
  name: "",
  isOpen: false,
  onOpen: (type, name, folderId) =>
    set(() => ({ type, isOpen: true, name, folderId })),
  onClose: () => set(() => ({ isOpen: false, name: "", type: "CREATE" })),
}));
