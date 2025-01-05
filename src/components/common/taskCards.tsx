import { Box, Checkbox, Paper, styled, Typography } from "@mui/material";
import { Task } from "@todolist/core/models/task.model";
import React, { FC } from "react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

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

  const formatTime = (date: Date) => format(date, "p");

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
          variant="h4"
          component="div"
          // color="black"
          className={is_completed ? "completed" : ""}
          sx={{fontWeight:500, fontSize:"16px"}}
        >
          {title}
        </Typography>
        <Checkbox
          checked={is_completed}
          icon={<RadioButtonUncheckedIcon sx={{ fontSize: 24 }} />} // Unchecked state
          checkedIcon={<CheckCircleIcon sx={{ fontSize: 24 }} />} // Checked state
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
          onClick={handleCheckboxClick}
          onChange={(e) =>
            onCheckboxChange(_id, e.target.checked) 
          }
        />
      </Box>
      <Typography
        variant="body2"
        color="#9F9F9F"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          // backgroundColor: "white",
          mb: 1,
          pb: 2,
          fontWeight:500, fontSize:"16px"
        }}
      >
        {description}
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body2" color="#BFBFBF"sx={{fontWeight:500, fontSize:"12px"}}>
          {dateLabel}
        </Typography>

        <Typography variant="body2" color="#BFBFBF" sx={{fontWeight:500, fontSize:"12px"}}>
          {formatTime(new Date(start_date))}
        </Typography>
        <Typography variant="body2" color="#BFBFBF">
          -
        </Typography>
        <Typography variant="body2" color="#BFBFBF"sx={{fontWeight:500, fontSize:"12px"}}>
          {formatTime(new Date(end_date))}
        </Typography>
      </Box>
    </TaskCardContainer>
  );
};
