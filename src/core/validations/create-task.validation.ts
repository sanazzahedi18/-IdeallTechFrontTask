import * as Yup from "yup";
import { isAfter, isSameDay, parse, startOfDay } from "date-fns";

export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required("Task title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  
  startDate: Yup.date().required("Start date is required"),
  startTime: Yup.string().required("Start time is required"),
  
  endDate: Yup.date()
    .required("End date is required")
    .test(
      "is-after-start-date",
      "End date must be after or equal to the start date",
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true;
        return !isAfter(startOfDay(new Date(startDate)), startOfDay(new Date(endDate)));
      }
    ),
  
  endTime: Yup.string()
    .required("End time is required")
    .test(
      "is-after-start-time",
      "End time must be after start time when dates are the same",
      function (endTime) {
        const { startDate, endDate, startTime } = this.parent;
        
        if (!startDate || !endDate || !startTime || !endTime) {
          return true;
        }

        if (!isSameDay(new Date(startDate), new Date(endDate))) {
          return true;
        }

        const startDateTime = parse(`${startTime}`, 'HH:mm', new Date());
        const endDateTime = parse(`${endTime}`, 'HH:mm', new Date());
        
        return isAfter(endDateTime, startDateTime);
      }
    ),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(100, "Description must be less than 500 characters"),
});