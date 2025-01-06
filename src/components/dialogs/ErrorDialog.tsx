import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

export const ErrorDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <Typography color="error">Failed to load task details</Typography>
    </DialogContent>
  </Dialog>
);
