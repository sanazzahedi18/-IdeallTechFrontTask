import { Task } from "@todolist/core/models/task.model";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Checkbox,
  Divider,
} from "@mui/material";

interface TaskDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, isCompleted: boolean) => void;
  taskCompletionStatus: boolean;
  isLoading?: boolean;
  error?: boolean;
}

export const TaskDetailsDialog = ({
  open,
  onClose,
  task,
  onDelete,
  onStatusChange,
  taskCompletionStatus,
  isLoading,
  error
}: TaskDetailsDialogProps) => {
  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">Failed to load task details</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (!task) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: "600px",
          height: "500px",
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
          textDecoration: taskCompletionStatus ? "line-through" : "none",
        }}
      >
        {task.title}
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="body2">
          <strong>Description:</strong> {task.description}
        </Typography>
        <Typography variant="body2">
          <strong>Start Date:</strong>{" "}
          {task.start_date
            ? new Date(task.start_date).toDateString()
            : "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>End Date:</strong>{" "}
          {task.end_date
            ? new Date(task.end_date).toDateString()
            : "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>Status:</strong>{" "}
          {task.is_completed ? "Completed" : "Pending"}
        </Typography>
        <Typography variant="body2">
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </Typography>

        <Box>
          <Checkbox
            checked={taskCompletionStatus}
            onChange={(e) => onStatusChange(task._id, e.target.checked)}
          />
          {taskCompletionStatus ? "Mark as Uncompleted" : "Mark as Completed"}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            px: 3,
            bgcolor: "#0760FB1A",
            color: "#0760FB",
            "&:hover": {
              bgcolor: "primary",
              opacity: 0.9,
            },
          }}
        >
          Close
        </Button>
        <Button
          onClick={() => onDelete(task._id)}
          variant="contained"
          color="secondary"
          sx={{
            px: 3,
            bgcolor: "#FB1A1A1A",
            color: "#FB1A1A",
            "&:hover": {
              bgcolor: "error",
              opacity: 0.9,
            },
          }}
        >
          Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};