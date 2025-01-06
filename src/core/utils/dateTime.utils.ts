import { parse } from 'date-fns';

export const dateTimeUtils = {
  createDateTime(date: string, time: string): Date {
    const [hours, minutes] = time.split(":");
    const dateTime = parse(date, "yyyy-MM-dd", new Date());
    dateTime.setHours(parseInt(hours), parseInt(minutes));
    return dateTime;
  }
};
