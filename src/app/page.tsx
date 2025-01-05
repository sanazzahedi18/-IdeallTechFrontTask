"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  CircularProgress,
  styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CategoryChips } from "@todolist/components/common/categoryChips";

import { Task } from "@todolist/core/models/task.model";
import { useRouter } from "next/navigation";
import {
  useDeleteTask,
  useGetAllTasks,
  useTaskDetails,
  useUpdateTask,
} from "@todolist/core/api/ToDo";
import { addDays, isBefore, isSameDay } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CategoryType } from "@todolist/core/models/category.models";
import { CustomTabPanel } from "@todolist/components/common/CustomTabPanel";
import { TabHeader } from "@todolist/components/common/TabHeader";
import { TaskCard } from "@todolist/components/common/TaskCards";
import { TaskDetailsDialog } from "@todolist/components/dialogs/TaskDetailsDialog";
import { DeleteConfirmationDialog } from "@todolist/components/common/DeleteConfirmationDialog";
import DarkModeSwitch from "@todolist/components/common/DarkModeSwitch";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [taskCompletionStatus, setTaskCompletionStatus] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateTaskStatus } = useUpdateTask();
  const { mutate: deleteTaskMutation, isPending: isDeleting } = useDeleteTask();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClickOpen = (task: Task) => {
    setSelectedTask(task._id);
    setTaskCompletionStatus(task.is_completed);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask("");
  };

  const handleNewTaskClick = () => {
    router.push("/CreateTask");
  };

  const handleCheckboxChange = async (taskId: string, isCompleted: boolean) => {
    setTaskCompletionStatus(isCompleted);
    updateTaskStatus(
      { id: taskId, isCompleted },
      {
        onSuccess: () => {
          toast.success("task status successfully");

          if (taskId === selectedTask) {
            setTaskCompletionStatus(isCompleted);
          }
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

  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    deleteTaskMutation(taskToDelete, {
      onSuccess: () => {
        toast.success("Task deleted successfully");

        setDeleteConfirmationOpen(false);
        handleClose();

        queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });

        setTaskToDelete(null);
      },
      onError: (error) => {
        toast.error(
          error?.message || "Failed to delete the task. Please try again."
        );
        setDeleteConfirmationOpen(false);
        setTaskToDelete(null);
      },
    });
  };

  const openDeleteConfirmationDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setTaskToDelete(null);
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
        return todaysTasks.filter((task) => task.is_completed);
      case "Archived":
        return todaysTasks.filter(
          (task) => task.is_completed && isBefore(new Date(task.end_date), date)
        );
      default:
        return todaysTasks; // "All"
    }
  };
  const { data, isLoading, isError } = useGetAllTasks();
  const {
    data: taskDetailsData,
    isLoading: taskDetailsLoading,
    isError: taskDetailsError,
  } = useTaskDetails(selectedTask);
  console.log("taskDetailsData", taskDetailsData);
  const tasks = data || [];
  // const StyledBox = styled(Box)({});
  const themes = useTheme();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">Failed to load tasks</Typography>
      </Box>
    );
  }

  if (taskDetailsLoading) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (taskDetailsError) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">Failed to load task details</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Box
        sx={{
          borderRadius: "16px",
          pb: 4,
          boxShadow: 2,
          mt: "50px",
          backgroundColor: themes.palette.grey["100"],
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <DarkModeSwitch />

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="task tabs"
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{ backgroundColor: themes.palette.grey["400"], pt: 4 }}
            TabIndicatorProps={{
              style: { backgroundColor: themes.palette.grey["300"] },
            }}
          >
            <Tab
              label="Today's Task"
              {...a11yProps(0)}
              sx={{
                fontWeight: 700,

                color: themes.palette.text.primary,
                "&.Mui-selected": { color: themes.palette.text.primary },
              }}
            />
            <Tab
              label="Tomorrow's Task"
              {...a11yProps(1)}
              sx={{
                fontWeight: 700,
                color: themes.palette.text.primary,
                "&.Mui-selected": { color: themes.palette.text.primary },
              }}
            />
          </Tabs>
        </Box>
        <Box sx={{ backgroundColor: themes.palette.grey["100"], py: 2 }}>
          <CustomTabPanel value={tabValue} index={0}>
            <TabHeader
              title={"Today's Task"}
              date={new Date()}
              handleNewTaskClick={handleNewTaskClick}
            />

            <CategoryChips
              tasks={getFilteredTasks(tasks, "All", new Date())}
              date={new Date()}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => setSelectedCategory(category)}
            />
            <Grid2 container spacing={3}>
              {getFilteredTasks(tasks, selectedCategory, new Date()).map(
                (task: Task) => (
                  <Grid2 size={{ xs: 12, md: 6 }} key={task._id}>
                    <TaskCard
                      key={task._id}
                      _id={task._id}
                      createdAt={task.createdAt}
                      description={task.description}
                      end_date={task.end_date}
                      is_completed={task.is_completed}
                      start_date={task.start_date}
                      title={task.title}
                      updatedAt={task.updatedAt}
                      onClick={() => handleClickOpen(task)}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  </Grid2>
                )
              )}
            </Grid2>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <TabHeader
              title={"Tomorrow's Task"}
              date={addDays(new Date(), 1)}
              handleNewTaskClick={handleNewTaskClick}
            />
            <CategoryChips
              tasks={getFilteredTasks(tasks, "All", addDays(new Date(), 1))}
              date={addDays(new Date(), 1)}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => setSelectedCategory(category)}
            />
            <Grid2 container spacing={3}>
              {getFilteredTasks(
                tasks,
                selectedCategory,
                addDays(new Date(), 1)
              ).map((task: Task) => (
                <Grid2 size={{ xs: 12, md: 6 }} key={task._id}>
                  <TaskCard
                    key={task._id}
                    _id={task._id}
                    createdAt={task.createdAt}
                    description={task.description}
                    end_date={task.end_date}
                    is_completed={task.is_completed}
                    start_date={task.start_date}
                    title={task.title}
                    updatedAt={task.updatedAt}
                    onClick={() => handleClickOpen(task)}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </Grid2>
              ))}
            </Grid2>
          </CustomTabPanel>
        </Box>
      </Box>

      {taskDetailsData && (
        <TaskDetailsDialog
          open={open}
          onClose={handleClose}
          task={taskDetailsData}
          onDelete={openDeleteConfirmationDialog}
          onStatusChange={handleCheckboxChange}
          taskCompletionStatus={taskCompletionStatus}
          isLoading={taskDetailsLoading}
          error={taskDetailsError}
        />
      )}
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={closeDeleteConfirmationDialog}
        onConfirm={handleDeleteTask}
        isDeleting={isDeleting}
      />
    </>
  );
}
