"use client";

import { FC } from "react";
import { Formik, Form } from "formik";
import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TaskFormValues } from "@todolist/core/models/createTask.model";
import { taskValidationSchema } from "@todolist/core/validations/create-task.validation";
import { useRouter } from "next/navigation";
import { useCreateTask } from "@todolist/core/api/ToDo";
import { parse, format } from "date-fns";
import { toast } from "react-toastify";

export const initialValues = {
  title: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  description: "",
};

const CreateTask: FC = () => {
  const router = useRouter();
  const createTask = useCreateTask();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const createDateTime = (date: string, time: string) => {
        const [hours, minutes] = time.split(":");
        const dateTime = parse(date, "yyyy-MM-dd", new Date());
        dateTime.setHours(parseInt(hours), parseInt(minutes));
        return dateTime;
      };

      const mappedObj: TaskFormValues = {
        description: values.description,
        title: values.title,
        start_date: createDateTime(values.startDate, values.startTime),
        end_date: createDateTime(values.endDate, values.endTime),
      };

      createTask.mutate(mappedObj, {
        onSuccess(data) {
          toast.success("Task has been successfully created");
          router.push("/");
        },
        onError(error) {
          toast.error("Failed to create the task status. Please try again.");
        },
      });
    } catch (error) {
      toast.error("Failed to create the task status. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        boxShadow: 3,
        backgroundColor: "#F9F9F9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          backgroundColor: "white",
          alignSelf: "flex-start",
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
          py: 5,
        }}
      >
        <IconButton onClick={() => router.back()} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Create New Task
        </Typography>
      </Box>
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#F9F9F9",
          boxShadow: "none",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={taskValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            touched,
            errors,
            values,
            handleChange,
            handleSubmit,
          }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  sx={{ backgroundColor: "#ffffff" }}
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
                    sx={{ backgroundColor: "#ffffff" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    sx={{ backgroundColor: "#ffffff" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    sx={{ backgroundColor: "#ffffff" }}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    sx={{ backgroundColor: "#ffffff" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                  sx={{ backgroundColor: "#ffffff" }}
                  rows={4}
                  fullWidth
                  error={Boolean(errors.description)}
                  helperText={Boolean(errors.description) && errors.description}
                />

                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={createTask.isPending}
                  >
                    Create Task
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default CreateTask;
