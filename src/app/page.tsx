"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { Task } from "@todolist/core/models/task.model";
import { CategoryType } from "@todolist/core/models/category.models";
import { CustomTabPanel } from "@todolist/components/common/CustomTabPanel";
import { TaskDetailsDialog } from "@todolist/components/dialogs/TaskDetailsDialog";
import { DeleteConfirmationDialog } from "@todolist/components/common/DeleteConfirmationDialog";
import { useTasks } from "@todolist/hooks/features/tasks/useTasks";
import { TabContent } from "@todolist/components/features/tabs/TabContent";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  } = useTasks(selectedTask);

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

  const openDeleteConfirmationDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setTaskToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (!taskToDelete) return;
    handleDeleteTask(taskToDelete, () => {
      setDeleteConfirmationOpen(false);
      handleClose();
      setTaskToDelete(null);
    });
  };

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
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            height: "70px",
            display: "flex",
            width: "100%",
            backgroundColor: theme.palette.grey["400"],
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="task tabs"
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              pt: 0,
              width: isMobile ? "100%" : "fit-content",
              alignSelf: "end",
            }}
            TabIndicatorProps={{
              style: { backgroundColor: theme.palette.grey["300"] },
            }}
          >
            <Tab
              label="Today's Task"
              {...a11yProps(0)}
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                "&.Mui-selected": { color: theme.palette.text.primary },
              }}
            />
            <Tab
              label="Tomorrow's Task"
              {...a11yProps(1)}
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                "&.Mui-selected": { color: theme.palette.text.primary },
              }}
            />
          </Tabs>
        </Box>
        <Box sx={{ backgroundColor: theme.palette.grey["100"], py: 2 }}>
          <CustomTabPanel value={tabValue} index={0}>
            <TabContent
              title="Today's Task"
              date={new Date()}
              tasks={tasks}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onNewTaskClick={handleNewTaskClick}
              filteredTasks={getFilteredTasks(
                tasks,
                selectedCategory,
                new Date()
              )}
              onTaskClick={handleClickOpen}
              onCheckboxChange={handleCheckboxChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <TabContent
              title="Tomorrow's Task"
              date={addDays(new Date(), 1)}
              tasks={tasks}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onNewTaskClick={handleNewTaskClick}
              filteredTasks={getFilteredTasks(
                tasks,
                selectedCategory,
                addDays(new Date(), 1)
              )}
              onTaskClick={handleClickOpen}
              onCheckboxChange={handleCheckboxChange}
            />
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

      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={closeDeleteConfirmationDialog}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}
