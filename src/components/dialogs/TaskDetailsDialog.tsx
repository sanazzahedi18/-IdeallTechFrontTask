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
  useTheme,
} from "@mui/material";
import { LoadingDialog } from "./LoadingDialog";
import { ErrorDialog } from "./ErrorDialog";

import { TaskDetailsDialogProps } from "@todolist/core/models/taskDetails.model";
import { TaskDateTimeFormatter } from "@todolist/core/utils/date.utils";


export const TaskDetailsDialog = ({
  open,
  onClose,
  task,
  onDelete,
  onStatusChange,
  taskCompletionStatus,
  isLoading,
  error,
}: TaskDetailsDialogProps) => {
  const themes = useTheme();
  // Centralizes date formatting logic for consistency across the dialog
  const dateTimeFormatter = new TaskDateTimeFormatter();

  // Early returns for loading/error states to prevent invalid renders
  if (isLoading) {
    return <LoadingDialog open={open} onClose={onClose} />;
  }
  if (error) {
    return <ErrorDialog open={open} onClose={onClose} />;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: "600px",
          height: "450px",
          borderRadius: 2,
          p: 2,
          bgcolor: themes.palette.grey["400"], // Consistent with app's color scheme
        },
      }}
    >
     
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
          textDecoration: task.is_completed ? "line-through" : "none",
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
          {dateTimeFormatter.format(task.start_date)}
        </Typography>
        <Typography variant="body2">
          <strong>End Date:</strong> {dateTimeFormatter.format(task.end_date)}
        </Typography>
        <Typography variant="body2">
          <strong>Status:</strong>{" "}
          {task.is_completed ? "Completed" : "Uncompleted"}
        </Typography>
        <Typography variant="body2">
          <strong>Created At:</strong>{" "}
          {dateTimeFormatter.format(task.createdAt)}
        </Typography>

        {/* Quick status toggle for better UX */}
        <Box>
          <Checkbox
            checked={task.is_completed}
            onChange={(e) => onStatusChange(e.target.checked)}
          />
          {task.is_completed ? "Mark as Uncompleted" : "Mark as Completed"}
        </Box>
      </DialogContent>

      
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            bgcolor: themes.palette.grey["600"],
            fontWeight: 500,
            fontSize: "14px",
            color: themes.palette.grey["500"],
            "&:hover": {
              bgcolor: "primary",
              opacity: 0.9,
            },
          }}
        >
          Close
        </Button>
        <Button
          onClick={onDelete}
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