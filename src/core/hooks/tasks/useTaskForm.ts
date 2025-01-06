import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ITaskFormValues } from "@todolist/core/models/taskForm.model";
import { TaskMapper } from "@todolist/core/mappers/task.mapper";
import { useCreateTask } from "@todolist/core/api/ToDo";
import { useQueryClient } from "@tanstack/react-query";

// Custom hook to centralize form submission logic and navigate after success
export const useTaskForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const createTask = useCreateTask();

  const handleSubmit = async (values: ITaskFormValues) => {
    try {
      // Maps form values to DTO format to match API requirements
      const taskDTO = TaskMapper.toDTO(values);

      // Uses mutation with callbacks for better UX feedback
      createTask.mutate(taskDTO, {
        onSuccess() {
          toast.success("Task has been successfully created");
          queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
          router.push("/"); 
        },
        onError() {
          toast.error("Failed to create the task status. Please try again.");
        },
      });
    } catch (error) {
    
      toast.error("Failed to create the task status. Please try again.");
    }
  };

  
  return {
    handleSubmit,
    isSubmitting: createTask.isPending, // For UI loading states
    goBack: () => router.back(), // Reuses router for consistent navigation
  };
};