import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const identifyContentType = (url: string) => {
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "tiff",
  ];

  const fileExtension = url.split(".").pop();
  if (!fileExtension) return "other";
  const lowerCaseExtension = fileExtension.toLowerCase();

  if (imageExtensions.includes(lowerCaseExtension)) {
    return "image";
  } else {
    return "other";
  }
};
