import { FC } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CreateTaskHeaderProps {
  onBack: () => void;
}

export const CreateTaskHeader: FC<CreateTaskHeaderProps> = ({ onBack }) => {
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        backgroundColor: themes.palette.grey["400"],
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
        py: "14px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
        <IconButton onClick={onBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontSize: isMobile ? "20px" : "34px" }}
        >
          Create New Task
        </Typography>
      </Box>
    </Box>
  );
};