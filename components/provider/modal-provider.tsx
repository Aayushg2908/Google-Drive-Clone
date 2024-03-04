"use client";

import { useEffect, useState } from "react";
import FolderModal from "../FolderModal";
import FileModal from "../FileModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FolderModal />
      <FileModal />
    </>
  );
};

export default ModalProvider;
