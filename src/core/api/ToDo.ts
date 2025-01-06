import { useMutation, useQuery } from "@tanstack/react-query";

import { APIRoutes } from "./APIRoutes";

import { AxiosResponse } from "axios";
import { TaskFormValues } from "../models/createTask.model";
import { api } from "../interceptor";
import { Task } from "../models/task.model";


interface ICreateTaskResponse {
  data: Task;
  message: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

// Helper function to create a task. Encapsulates the API call to maintain modularity and reusability.
const createTask = async (
  data: TaskFormValues
): Promise<AxiosResponse<ICreateTaskResponse>> => {
  try {
    const response = await api.post(APIRoutes.CreateTask, data);

    return response;
  } catch (error) {
    return Promise.reject("api failed");
  }
};

// Custom hook for creating tasks. Keeps mutation logic isolated and reusable.
export const useCreateTask = () => {
  return useMutation({
    mutationKey: ["task"],
    mutationFn: (data: TaskFormValues) => {
      return createTask(data);
    },
  });
};

// Helper function to fetch all tasks
const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<ApiResponse<Task[]>>(APIRoutes.GetAllTasks);
    return response.data.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

// Custom hook for fetching all tasks
export const useGetAllTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["getAllTasks"],
    queryFn: getAllTasks,
  });
};

// Helper function to fetch details of a specific task by ID.
const taskDetails = async (id: string) => {
  try {
    const response = await api.get(`${APIRoutes.TaskDetails}/${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};

// Custom hook for fetching task details by ID.
export const useTaskDetails = (id: string) => {
  return useQuery({
    queryKey: ["taskDetails", id],
    queryFn: () => taskDetails(id),
    enabled: Boolean(id),
  });
};

// Helper function to update a task's status.
const updateTask = async (id: string, isCompleted: boolean) => {
  try {
    const response = await api.put(`${APIRoutes.UpdateTask}/${id}`, {
      is_completed: isCompleted,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    return false;
  }
};

// Custom hook for updating task status.
export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (data: { id: string; isCompleted: boolean }) =>
      updateTask(data.id, data.isCompleted),
  });
};

// Helper function to delete a task by ID.
const deleteTask = async (
  Id: string
): Promise<AxiosResponse<ApiResponse<null>>> => {
  try {
    const response = await api.delete<ApiResponse<null>>(
      `${APIRoutes.DeleteTask}/${Id}`
    );
    return response;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw new Error("Failed to delete task");
  }
};

// Custom hook for deleting tasks.
export const useDeleteTask = () => {
  return useMutation<AxiosResponse<ApiResponse<null>>, Error, string>({
    mutationFn: (taskId: string) => deleteTask(taskId),
  });
};
