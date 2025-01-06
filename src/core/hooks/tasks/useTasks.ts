import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Task } from "@todolist/core/models/task.model";
import { CategoryType } from "@todolist/core/models/category.models";
import { isBefore, isSameDay } from "date-fns";
import { useDeleteTask, useGetAllTasks, useTaskDetails, useUpdateTask } from "@todolist/core/api/ToDo";

export const useTasks = (selectedTask: string) => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useGetAllTasks();
  const { mutate: updateTaskStatus } = useUpdateTask();
  const { mutate: deleteTaskMutation, isPending: isDeleting } = useDeleteTask();
  const {
    data: taskDetailsData,
    isLoading: taskDetailsLoading,
    isError: taskDetailsError,
  } = useTaskDetails(selectedTask);

  const handleCheckboxChange = async (taskId: string, isCompleted: boolean) => {
    updateTaskStatus(
      { id: taskId, isCompleted },
      {
        onSuccess: () => {
          toast.success(isCompleted ? "Task is Done" : "Task is not done");
          queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
          if (selectedTask === taskId) {
            queryClient.invalidateQueries({
              queryKey: ["taskDetails", taskId],
            });
          }
        },
        onError: () => {
          toast.error("Failed to update the task status. Please try again.");
        },
      }
    );
  };

  const handleDeleteTask = (taskId: string, onSuccess: () => void) => {
    deleteTaskMutation(taskId, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
        onSuccess();
      },
      onError: (error) => {
        toast.error(
          error?.message || "Failed to delete the task. Please try again."
        );
      },
    });
  };

  const getFilteredTasks = (
    tasks: Task[],
    category: CategoryType,
    date: Date
  ) => {
    const todaysTasks = tasks.filter((task) =>
      isSameDay(date, task.start_date)
    );

    switch (category) {
      case "Open":
        return todaysTasks.filter((task) => !task.is_completed);
      case "Closed":
        return tasks.filter((task) =>
          isBefore(new Date(task.end_date), new Date())
        );
      case "Archived":
        return todaysTasks.filter((task) => task.is_completed);
      default:
        return todaysTasks;
    }
  };

  return {
    tasks: tasks || [],
    isLoading,
    isError,
    taskDetailsData,
    taskDetailsLoading,
    taskDetailsError,
    isDeleting,
    handleCheckboxChange,
    handleDeleteTask,
    getFilteredTasks,
  };
};
