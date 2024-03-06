"use client";

import { useEffect, useState } from "react";
import FolderModal from "../FolderModal";
import FileModal from "../FileModal";
import ShareModal from "../ShareModal";
import FileViewerModal from "../FileViewerModal";

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
      <ShareModal />
      <FileViewerModal />
    </>
  );
};

export default ModalProvider;
