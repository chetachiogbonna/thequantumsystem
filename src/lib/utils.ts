import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = <T>(value: T) => {
  const data: T = JSON.parse(JSON.stringify(value));
  return data;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const formatTimeAgo = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hour12: false,
  };

  return date.toLocaleString("en-GB", options).replace(",", " at");
}

export function formatFirestoreTimestamp(timestamp: Timestamp): string {
  const date = new Date(timestamp.seconds * 1000);

  const dayOfWeek = date.toLocaleDateString("en-GB", { weekday: "long" });
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `Posted on ${dayOfWeek}, ${day}${suffix} ${month} ${year} @ ${hours}:${minutes}`;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

export function firestoreTimestampToDate(timestamp: Timestamp): Date {
  return new Date(
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1_000_000)
  );
}

export const isAdmin = (email: string) => {
  return email === "flexygodswill3@gmail.com" || email === "flawlessemmanuel@gmail.com" || email === "historianden@gmail.com";
};