import {
    differenceInDays,
    differenceInWeeks,
    format,
    isToday,
    isYesterday,
  } from "date-fns";
  
  /**
   * Returns a readable string for a given date.
   * If the date is:
   * - Today: returns "Today"
   * - Yesterday: returns "Yesterday"
   * - Within 6 days ago: returns "X days ago"
   * - 2 weeks ago: returns "2 weeks ago"
   * - Else: returns a formatted date (e.g., "4 Jan 2025")
   */
  export function getReadableDate(date: Date | string): string {
    if (typeof date === "string") {
      date = new Date(date);
    }
  
    const today = new Date();
  
    if (isToday(date)) {
      return "Today";
    }
  
    if (isYesterday(date)) {
      return "Yesterday";
    }
  
    const daysDifference = differenceInDays(today, date);
  
    if (daysDifference <= 6) {
      return `${daysDifference} days ago`;
    }
  
    const weeksDifference = differenceInWeeks(today, date);
  
    if (weeksDifference === 2) {
      return "2 weeks ago";
    }
  
    return format(date, "d MMM yyyy");
  }
  