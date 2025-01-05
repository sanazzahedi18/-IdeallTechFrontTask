import { FC } from "react";
import { TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { ITaskFormValues } from "@todolist/core/models/taskForm.models";

interface TaskFormFieldsProps {
  values: ITaskFormValues;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export const TaskFormFields: FC<TaskFormFieldsProps> = ({
  values,
  errors,
  handleChange,
}) => {
  const themes = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        sx={{ backgroundColor: themes.palette.grey["400"] }}
        name="title"
        label="Task Title"
        value={values.title}
        onChange={handleChange}
        fullWidth
        error={Boolean(errors.title)}
        helperText={Boolean(errors.title) && errors.title}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          name="startDate"
          label="Start Date"
          type="date"
          fullWidth
          sx={{ backgroundColor: themes.palette.grey["400"] }}
          InputLabelProps={{ shrink: true }}
          value={values.startDate}
          onChange={handleChange}
          error={Boolean(errors.startDate)}
          helperText={Boolean(errors.startDate) && errors.startDate}
        />
        <TextField
          name="startTime"
          label="Start Time"
          type="time"
          fullWidth
          value={values.startTime}
          onChange={handleChange}
          sx={{ backgroundColor: themes.palette.grey["400"] }}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.startTime)}
          helperText={Boolean(errors.startTime) && errors.startTime}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          name="endDate"
          label="End Date"
          type="date"
          value={values.endDate}
          onChange={handleChange}
          sx={{ backgroundColor: themes.palette.grey["400"] }}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.endDate)}
          helperText={Boolean(errors.endDate) && errors.endDate}
        />
        <TextField
          name="endTime"
          label="End Time"
          type="time"
          fullWidth
          value={values.endTime}
          onChange={handleChange}
          sx={{ backgroundColor: themes.palette.grey["400"] }}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.endTime)}
          helperText={Boolean(errors.endTime) && errors.endTime}
        />
      </Box>

      <TextField
        name="description"
        label="Description"
        multiline
        value={values.description}
        onChange={handleChange}
        sx={{ backgroundColor: themes.palette.grey["400"] }}
        rows={4}
        fullWidth
        error={Boolean(errors.description)}
        helperText={Boolean(errors.description) && errors.description}
      />
    </Box>
  );
};
