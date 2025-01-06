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

export const useCreateTask = () => {
  return useMutation({
    mutationKey: ["task"],
    mutationFn: (data: TaskFormValues) => {
      return createTask(data);
    },
  });
};

const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<ApiResponse<Task[]>>(APIRoutes.GetAllTasks);
    return response.data.data; // Ensure the API returns the array of tasks
  } catch (error) {
    console.error(error);
    return []; // Always return an empty array if there's an error
  }
};

export const useGetAllTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["getAllTasks"],
    queryFn: getAllTasks,
  });
};

const taskDetails = async (id: string) => {
  try {
    const response = await api.get(`${APIRoutes.TaskDetails}/${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};

export const useTaskDetails = (id: string) => {
  return useQuery({
    queryKey: ["taskDetails", id],
    queryFn: () => taskDetails(id),
    enabled: Boolean(id),
  });
};

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

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (data: { id: string; isCompleted: boolean }) =>
      updateTask(data.id, data.isCompleted),
  });
};

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

export const useDeleteTask = () => {
  return useMutation<AxiosResponse<ApiResponse<null>>, Error, string>({
    mutationFn: (taskId: string) => deleteTask(taskId),
  });
};
