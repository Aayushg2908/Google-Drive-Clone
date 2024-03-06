import { File } from "@prisma/client";
import { create } from "zustand";

interface FileViewerModalState {
  file: File | null;
  isOpen: boolean;
  onOpen: (file: File) => void;
  onClose: () => void;
}

export const useFileViewerModal = create<FileViewerModalState>((set) => ({
  file: null,
  isOpen: false,
  onOpen: (file) => set({ file, isOpen: true }),
  onClose: () => set({ file: null, isOpen: false }),
}));
