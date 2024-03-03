"use client";

import { useEffect, useState } from "react";
import FolderModal from "../FolderModal";

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
    </>
  );
};

export default ModalProvider;
