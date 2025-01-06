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

// Default values to prevent form undefined errors and provide clear starting state
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
  // Custom hook to separate form logic from presentation and enable reuse
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
     
      {/* Paper component wraps form for proper spacing and visual separation */}
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
        {/* Formik handles form state and validation to reduce boilerplate and ensure data consistency */}
        <Formik
          initialValues={initialValues}
          validationSchema={taskValidationSchema}
          onSubmit={handleSubmit}
        >
          {/* Render props pattern to access form state and handlers */}
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