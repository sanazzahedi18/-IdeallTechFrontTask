import { CategoryType } from "@todolist/core/models/category.models";
import { Task } from "@todolist/core/models/task.model";
import { isToday, isBefore, isSameDay } from "date-fns";

export const getCategoryStats = (tasks: Task[], date: Date) => [
  {
    label: "All" as CategoryType,
    count: tasks.filter((task) => isSameDay(date, task.start_date)).length,
  },
  {
    label: "Open" as CategoryType,
    count: tasks.filter(
      (task) => !task.is_completed && isSameDay(date, task.start_date)
    ).length,
  },
  {
    label: "Closed" as CategoryType,
    count: tasks.filter((task) => isBefore(task.end_date, new Date())).length,
  },
  {
    label: "Archived" as CategoryType,
    count: tasks.filter(
      (task) => task.is_completed && isSameDay(date, task.start_date)
    ).length,
  },
];
