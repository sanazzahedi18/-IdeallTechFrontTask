import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "@todolist/styles/theme";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";

import React, { FC } from "react";

interface ITabHeaderProps {
  handleNewTaskClick: () => void;
  title: string;
  date: Date;
}

export const TabHeader: FC<ITabHeaderProps> = ({
  handleNewTaskClick,
  title,
  date,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" color="#9F9F9F">
            {format(date, "EEEE, dd MMM")}
            {/* {format(addDays(new Date(), 1), "EEEE, dd MMM")} */}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleNewTaskClick}
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#0760FB1A",
            color: "#0760FB",
            "&:hover": {
              bgcolor: "primary",
              opacity: 0.9,
            },
          }}
        >
          New Task
        </Button>
      </Box>
    </>
  );
};
