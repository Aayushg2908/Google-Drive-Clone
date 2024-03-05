import { File } from "@prisma/client";
import { create } from "zustand";

interface ShareModalState {
  file: File | null;
  isOpen: boolean;
  onOpen: (file: File) => void;
  onClose: () => void;
}

export const useShareModal = create<ShareModalState>((set) => ({
  file: null,
  isOpen: false,
  onOpen: (file) => set(() => ({ isOpen: true, file })),
  onClose: () => set(() => ({ isOpen: false, file: null })),
}));
