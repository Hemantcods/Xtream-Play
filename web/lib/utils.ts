import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | unknown,
): string {
  if (typeof error === "object" && error && "status" in error) {
    const fetchError = error as FetchBaseQueryError;
    const data = fetchError.data as { message?: string };

    return data.message ?? "Request failed";
  }

  if (typeof error === "object" && error && "message" in error) {
    return String((error as SerializedError).message);
  }

  return "Something went wrong";
}
