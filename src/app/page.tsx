"use client"; 

import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Task } from "@todolist/core/models/task.model";
import { CategoryType } from "@todolist/core/models/category.models";
import { useTasks } from "@todolist/core/hooks/tasks/useTasks";
import { TaskTabs } from "@todolist/components/features/tabs/TaskTabs";
import { TaskDialogs } from "@todolist/components/dialogs/TaskDialogs";

// Props interface to allow customization of initial tab selection
export interface HomeViewProps {
  initialTabValue?: number;
}

// Centralized dialog state to manage multiple modal states and prevent state conflicts
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

export const HomeView: React.FC<HomeViewProps> = ({ initialTabValue = 0 }) => {
  // State initialization at component level to maintain consistency across child components
  const [tabValue, setTabValue] = useState(initialTabValue);
  const [dialogState, setDialogState] = useState<DialogState>({
    taskDetails: { open: false, selectedTask: "", completionStatus: false },
    deleteConfirmation: { open: false, taskToDelete: null },
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  const theme = useTheme();
  const router = useRouter();

  // Custom hook to centralize task-related operations and state management
  const {
    tasks,
    isLoading,
    isError,
    taskDetailsData,
    taskDetailsLoading,
    taskDetailsError,
    isDeleting,
    handleCheckboxChange,
    handleDeleteTask,
    getFilteredTasks,
  } = useTasks(dialogState.taskDetails.selectedTask);

  // Opens task details dialog to show more information when user needs to view/edit a task
  const handleTaskClick = (task: Task) => {
    setDialogState((prev) => ({
      ...prev,
      taskDetails: {
        open: true,
        selectedTask: task._id,
        completionStatus: task.is_completed,
      },
    }));
  };

  // Resets dialog state to prevent stale data when reopening
  const handleDialogClose = () => {
    setDialogState((prev) => ({
      ...prev,
      taskDetails: { open: false, selectedTask: "", completionStatus: false },
    }));
  };

  // Redirects to create task page instead of modal for better UX with complex form
  const handleNewTaskClick = () => router.push("/CreateTask");

  // Two-step delete process to prevent accidental deletions
  const handleDeleteDialogOpen = (taskId: string) => {
    setDialogState((prev) => ({
      ...prev,
      deleteConfirmation: { open: true, taskToDelete: taskId },
    }));
  };

  // Resets delete confirmation state to prevent accidental deletions on next open
  const handleDeleteDialogClose = () => {
    setDialogState((prev) => ({
      ...prev,
      deleteConfirmation: { open: false, taskToDelete: null },
    }));
  };

  // Ensures task exists before deletion and handles cleanup after successful delete
  const handleDeleteConfirm = () => {
    const { taskToDelete } = dialogState.deleteConfirmation;
    if (!taskToDelete) return;

    handleDeleteTask(taskToDelete, () => {
      handleDeleteDialogClose();
      handleDialogClose();
    });
  };



  return (
    <>
      <Box
        sx={{
          borderRadius: "16px",
          pb: 4,
          boxShadow: 2,
          backgroundColor: theme.palette.grey["100"],
          overflow: "hidden",
        }}
      >
        <TaskTabs
          tabValue={tabValue}
          onTabChange={(newValue: number) => setTabValue(newValue)}
          tasks={tasks}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onNewTaskClick={handleNewTaskClick}
          getFilteredTasks={getFilteredTasks}
          onTaskClick={handleTaskClick}
          onCheckboxChange={handleCheckboxChange}
        />
      </Box>

      {/* Separated dialogs component to reduce main component complexity */}
      <TaskDialogs
        dialogState={dialogState}
        taskDetailsData={taskDetailsData}
        taskDetailsLoading={taskDetailsLoading}
        taskDetailsError={taskDetailsError}
        isDeleting={isDeleting}
        onClose={handleDialogClose}
        onDelete={handleDeleteDialogOpen}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteDialogClose={handleDeleteDialogClose}
        onStatusChange={handleCheckboxChange}
      />
    </>
  );
};

export default HomeView;