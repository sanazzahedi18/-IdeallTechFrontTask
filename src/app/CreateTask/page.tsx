"use client";

import { FC } from "react";
import { Formik, Form } from "formik";
import { Box, Paper, useTheme } from "@mui/material";
import { taskValidationSchema } from "@todolist/core/validations/create-task.validation";
import { ITaskFormValues } from "@todolist/core/models/taskForm.model";
import { CreateTaskHeader } from "@todolist/components/features/tasks/CreateTaskHeader";
import { TaskFormFields } from "@todolist/components/features/tasks/TaskFormFields";
import { TaskFormActions } from "@todolist/components/features/tasks/TaskFormActions";
import { useTaskForm } from "@todolist/core/hooks/tasks/useTaskForm";

export const initialValues: ITaskFormValues = {
  title: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  description: "",
};

const CreateTask: FC = () => {
  const themes = useTheme();
  const { handleSubmit, isSubmitting, goBack } = useTaskForm();

  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        backgroundColor: themes.palette.grey["100"],
      }}
    >
      <CreateTaskHeader onBack={goBack} />
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: themes.palette.grey["100"],
          boxShadow: "none",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={taskValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TaskFormFields
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
                <TaskFormActions
                  onCancel={goBack}
                  isSubmitting={isSubmitting}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default CreateTask;
