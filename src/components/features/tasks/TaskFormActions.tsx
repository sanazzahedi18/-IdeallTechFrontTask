import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material';

interface TaskFormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

export const TaskFormActions: FC<TaskFormActionsProps> = ({
  onCancel,
  isSubmitting
}) => {
  const themes = useTheme();
 
  const buttonStyles = {
    bgcolor: themes.palette.grey["600"],
    fontWeight: 500,
    fontSize: "14px",
    color: themes.palette.grey["500"],
    "&:hover": {
      bgcolor: "primary",
      opacity: 0.9,
    },
  };

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
      <Button
        type="button"
        variant="contained"
        onClick={onCancel}
        sx={buttonStyles}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={buttonStyles}
      >
        Create Task
      </Button>
    </Box>
  );
};