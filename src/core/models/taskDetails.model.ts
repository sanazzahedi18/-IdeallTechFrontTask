import { Task } from "@todolist/core/models/task.model";

export interface TaskDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  onDelete: () => void;
  onStatusChange: (isCompleted: boolean) => void;
  taskCompletionStatus: boolean;
  isLoading?: boolean;
  error?: boolean;
}