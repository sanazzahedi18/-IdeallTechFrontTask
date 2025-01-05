import { CategoryType } from "@todolist/core/models/category.models";
import { isToday, isBefore, isSameDay } from "date-fns";


export const getCategoryStats = (tasks: any[], date: Date) => [
  {
    label: "All" as CategoryType,
    count: tasks.length,
  },
  {
    label: "Open" as CategoryType,
    count: tasks.filter(
      (task) =>  !task.is_completed
    ).length,
  },
  {
    label: "Closed" as CategoryType,
    count: tasks.filter(
      (task) =>  task.is_completed
    ).length,
  },
  {
    label: "Archived" as CategoryType,
    count: tasks.filter(
      (task) =>
        task.is_completed && isBefore(task.end_date, date)
    ).length,
  },
];
