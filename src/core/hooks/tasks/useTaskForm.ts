import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ITaskFormValues } from "@todolist/core/models/taskForm.model";
import { TaskMapper } from "@todolist/core/mappers/task.mapper";
import { useCreateTask } from "@todolist/core/api/ToDo";

export const useTaskForm = () => {
  const router = useRouter();
  const createTask = useCreateTask();

  const handleSubmit = async (values: ITaskFormValues) => {
    try {
      const taskDTO = TaskMapper.toDTO(values);

      createTask.mutate(taskDTO, {
        onSuccess() {
          toast.success("Task has been successfully created");
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
    isSubmitting: createTask.isPending,
    goBack: () => router.back(),
  };
};
