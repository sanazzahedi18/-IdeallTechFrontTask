import { Task } from "@todolist/core/models/task.model";
import { TaskDetailsDialog } from "@todolist/components/dialogs/TaskDetailsDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

interface DialogState {
  taskDetails: {
    open: boolean;
    selectedTask: string;
    completionStatus: boolean;
  };
  deleteConfirmation: {
    open: boolean;
    taskToDelete: string | null;
  };
}

interface TaskDialogsProps {
  dialogState: DialogState;
  taskDetailsData: Task | null;
  taskDetailsLoading: boolean;
  taskDetailsError: boolean | null;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: (taskId: string) => void;
  onDeleteConfirm: () => void;
  onDeleteDialogClose: () => void;
  onStatusChange: (taskId: string, isCompleted: boolean) => void;
}

export const TaskDialogs: React.FC<TaskDialogsProps> = ({
  dialogState,
  taskDetailsData,
  taskDetailsLoading,
  taskDetailsError,
  isDeleting,
  onClose,
  onDelete,
  onDeleteConfirm,
  onDeleteDialogClose,
  onStatusChange,
}) => {
  if (!taskDetailsData) return null;

  return (
    <>
      <TaskDetailsDialog
        open={dialogState.taskDetails.open}
        onClose={onClose}
        task={taskDetailsData}
        onDelete={() => onDelete(taskDetailsData._id)}
        onStatusChange={(isCompleted: boolean) =>
          onStatusChange(taskDetailsData._id, isCompleted)
        }
        taskCompletionStatus={dialogState.taskDetails.completionStatus}
        isLoading={taskDetailsLoading}
        error={!!taskDetailsError}
      />

      <DeleteConfirmationDialog
        open={dialogState.deleteConfirmation.open}
        onClose={onDeleteDialogClose}
        onConfirm={onDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
};