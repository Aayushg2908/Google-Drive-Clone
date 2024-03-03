import { Folder } from "@prisma/client";
import { create } from "zustand";

type Action = "CREATE" | "UPDATE";

interface FolderModalState {
  type: Action;
  folder: Folder | null;
  isOpen: boolean;
  onOpen: (type: Action, folder?: Folder) => void;
  onClose: () => void;
}

export const useFolderModal = create<FolderModalState>((set) => ({
  type: "CREATE",
  folder: null,
  isOpen: false,
  onOpen: (type, folder) => set(() => ({ type, isOpen: true, folder })),
  onClose: () => set(() => ({ isOpen: false, folder: null, type: "CREATE" })),
}));
