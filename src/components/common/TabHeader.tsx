import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const themes = useTheme();

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
            sx={{
              fontWeight: 700,
              fontSize: `${isMobile ? "20px" : "h4"}`,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="#9F9F9F"
            sx={{
              fontWeight: 500,
              fontSize: `${isMobile ? "14px" : "28px"}`,
            }}
          >
            {format(date, "EEEE, dd MMM")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleNewTaskClick}
          startIcon={<AddIcon />}
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
          New Task
        </Button>
      </Box>
    </>
  );
};
