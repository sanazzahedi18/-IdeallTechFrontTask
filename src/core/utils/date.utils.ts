import { format, isValid, parseISO } from "date-fns";

export interface DateFormatter {
  format(date: string | Date | null): string;
}

export class TaskDateTimeFormatter implements DateFormatter {
  format(date: string | Date): string {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, "PPp") : "Invalid Date";
  }
}
