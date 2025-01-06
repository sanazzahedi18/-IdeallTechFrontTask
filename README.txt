IdeallTechFrontTask Documentation:

ToDo Web App Test


Description:

This project is a responsive and dynamic To-Do List application built with 
Next.js (App Router) and various modern web development tools. It features Task management
with functionality for creating, viewing, filtering, updating, and deleting Tasks.
The application is designed with Material-UI for an elegant and responsive user interface
and incorporates a dark mode toggle for enhanced user experience.

Setup instructions:

# Clone the repository
        git clone <repository-url>
        cd <project-directory>
## Run (npm i) in the root of the project on (main) branch
### Run (npm run dev) in the root of the project
#### Open localhost:3000 in a browser
 

Key Features:

Task Management:
Two primary tabs for Today’s Tasks and Tomorrow’s Tasks.
Sub-tabs for filtering Tasks: All(All Task for today and tomorrow), Open(Tasks which are
not completed for today and tomorrow), Closed(OutDated Tasks Completed or not completed
for today or tomorrow), and Archived(All completed Task for today or tomorrow).

Task Actions:
Mark Tasks as completed or uncompleted using a checkbox for updating.
View detailed information in a modal with Task status update functionality.
Delete Tasks with a confirmation dialog.

Create Task Page:
Includes validated form fields for creating new Tasks.
Validation implemented using Formik and Yup for robust form handling.

Dark Mode:
Global dark mode toggle implemented with Redux Toolkit.

Responsiveness:
Fully responsive design based on one Figma-provided view and additional designs.

Error Handling:
Real-time API error management with React Query and user feedback using Toastify.


Tech Stack:

Framework: Next.js (App Router)
Programming Language: TypeScript
UI Library: Material-UI (MUI)
State Management: Redux Toolkit (including for dark mode)
Data Fetching: React Query
HTTP Client: Axios
Form Handling: Formik with Yup
Date Utilities: date-fns
Toasts: Toastify


Project Structure:
src/
├── app/
│   ├── page.tsx
│   └── createTask/
├── assets/
│   ├── fonts/
│   └── images/
├── components/
│   ├── common/
│   │   ├── CategoryChips.tsx
│   │   ├── DarkModeSwitch.tsx
│   │   ├── TabHeader.tsx
│   │   ├── TaskCards.tsx
│   │   └── TaskList.tsx
│   │   
│   │   
│   ├── dialogs/
│   │   ├── DeleteConfirmationDialog.tsx
│   │   ├── ErrorDialog.tsx
│   │   ├── LoadingDialog.tsx
│   │   ├── TaskDetailsDialog.tsx
│   │   └── TaskDialogs.tsx
│   └── features/
│       ├── tabs/
│       │   ├── CustomTabPanel.tsx
│       │   ├── TabContent.tsx
│       │   └── TaskTabs.tsx
│       └── tasks/
│           ├── CreateTaskHeader.tsx
│           ├── TaskFormActions.tsx
│           └── TaskFormFields.tsx
└── core/
    ├── api/
    │   ├── APIRoutes.ts
    │   └── ToDo.ts
    ├── hooks/
    │   └── tasks/
    │           ├── useTaskForm.ts
    │           └── useTasks.ts
    ├── interceptor/
    │   └── index.ts
    ├── mappers/
    │   └── task.mapper.ts
    ├── models/
    │   ├── category.models.ts
    │   ├── createTask.model.ts
    │   ├── task.model.ts
        ├── taskDetails.model.ts
    │   └── taskForm.model.ts
    ├── redux/
    │   ├── slices/
    │   │   └── darkModeSlice.tsx
    │   └── store/
    │       └── store.ts
    ├── styles/
    │   ├── styledBadge.tsx
    │   └── theme.tsx
    ├── utils/
    │   ├── categoryStats.utils.ts
    │   ├── date.utils.ts
    │   └── dateTime.utils.ts
    └── validations/
        └── create-task.validation.ts

API Integration
The app uses Axios for HTTP requests, and React Query handles caching, refetching, 
and error states. API functions are modularized under the src/core/api folder.


Additional Notes
* I will provide the env file in the git repository because there is BaseAPI without 
api key in the file.