import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const LoadingDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Loading...</DialogTitle>
    <DialogContent>
      <CircularProgress />
    </DialogContent>
  </Dialog>
);
