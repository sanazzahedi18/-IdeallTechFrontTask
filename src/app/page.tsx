"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Task } from "@todolist/core/models/task.model";
import { CategoryType } from "@todolist/core/models/category.models";
import { useTasks } from "@todolist/core/hooks/tasks/useTasks";
import { LoadingState } from "@todolist/components/common/LoadingState";
import { ErrorState } from "@todolist/components/common/ErrorState";
import { TaskTabs } from "@todolist/components/features/tabs/TaskTabs";
import { TaskDialogs } from "@todolist/components/dialogs/TaskDialogs";

export interface HomeViewProps {
  initialTabValue?: number;
}

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
  const [tabValue, setTabValue] = useState(initialTabValue);
  const [dialogState, setDialogState] = useState<DialogState>({
    taskDetails: { open: false, selectedTask: "", completionStatus: false },
    deleteConfirmation: { open: false, taskToDelete: null },
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  const theme = useTheme();
  const router = useRouter();

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

  const handleDialogClose = () => {
    setDialogState((prev) => ({
      ...prev,
      taskDetails: { open: false, selectedTask: "", completionStatus: false },
    }));
  };

  const handleNewTaskClick = () => router.push("/CreateTask");

  const handleDeleteDialogOpen = (taskId: string) => {
    setDialogState((prev) => ({
      ...prev,
      deleteConfirmation: { open: true, taskToDelete: taskId },
    }));
  };

  const handleDeleteDialogClose = () => {
    setDialogState((prev) => ({
      ...prev,
      deleteConfirmation: { open: false, taskToDelete: null },
    }));
  };

  const handleDeleteConfirm = () => {
    const { taskToDelete } = dialogState.deleteConfirmation;
    if (!taskToDelete) return;

    handleDeleteTask(taskToDelete, () => {
      handleDeleteDialogClose();
      handleDialogClose();
    });
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message="Failed to load tasks" />;

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
