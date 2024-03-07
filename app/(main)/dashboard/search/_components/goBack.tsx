"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex gap-x-2 items-center cursor-pointer my-4"
    >
      <ChevronLeft />
      <span className="font-bold">Go Back</span>
    </div>
  );
};

export default GoBack;
