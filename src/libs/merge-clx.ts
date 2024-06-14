import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function clx(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
