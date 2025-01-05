import { Box, Checkbox, Paper, styled, Typography } from "@mui/material";
import { Task } from "@todolist/core/models/task.model";
import React, { FC } from "react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

const TaskCardContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .completed": {
    textDecoration: "line-through",
    color: theme.palette.text.secondary,
  },
}));

interface ITaskCard extends Task {
  onClick: () => void;
  onCheckboxChange: (taskId: string, isCompleted: boolean) => void;
}

export const TaskCard: FC<ITaskCard> = ({
  _id,
  createdAt,
  description,
  end_date,
  is_completed,
  start_date,
  title,
  updatedAt,
  onClick,
  onCheckboxChange,
}) => {
  const createdDate = new Date(start_date);

  let dateLabel = "";
  if (isToday(createdDate)) {
    dateLabel = "Today";
  } else if (isTomorrow(createdDate)) {
    dateLabel = "Tomorrow";
  } else if (isYesterday(createdDate)) {
    dateLabel = "Yesterday";
  } else {
    dateLabel = format(createdDate, "MMM dd, yyyy");
  }

  const formatTime = (date: Date) => format(date, "hh a");

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <TaskCardContainer elevation={1} onClick={onClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="#000000"
          className={is_completed ? "completed" : ""}
        >
          {title}
        </Typography>
        <Checkbox
          checked={is_completed}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
          onClick={handleCheckboxClick}
          onChange={(e) =>
            onCheckboxChange(_id, e.target.checked) // Trigger the update mutation
          }
        />
      </Box>
      <Typography
        variant="body2"
        color="#9F9F9F"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          mb: 1,
          pb: 2,
        }}
      >
        {description}
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body2" color="#BFBFBF">
          {dateLabel}
        </Typography>

        <Typography variant="body2" color="#BFBFBF">
          {formatTime(new Date(start_date))}
        </Typography>
        <Typography variant="body2" color="#BFBFBF">
          -
        </Typography>
        <Typography variant="body2" color="#BFBFBF">
          {formatTime(new Date(end_date))}
        </Typography>
      </Box>
    </TaskCardContainer>
  );
};
