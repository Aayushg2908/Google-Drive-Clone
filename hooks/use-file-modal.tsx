import { create } from "zustand";

interface FileModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFileModal = create<FileModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
