import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { addDays } from "date-fns";
import { Task } from "@todolist/core/models/task.model";
import { CategoryType } from "@todolist/core/models/category.models";
import { CustomTabPanel } from "@todolist/components/common/CustomTabPanel";
import { TabContent } from "@todolist/components/features/tabs/TabContent";

interface TaskTabsProps {
  tabValue: number;
  onTabChange: (newValue: number) => void;
  tasks: Task[];
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  onNewTaskClick: () => void;
  getFilteredTasks: (
    tasks: Task[],
    category: CategoryType,
    date: Date
  ) => Task[];
  onTaskClick: (task: Task) => void;
  onCheckboxChange: (taskId: string, isCompleted: boolean) => void;
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

export const TaskTabs: React.FC<TaskTabsProps> = ({
  tabValue,
  onTabChange,
  tasks,
  selectedCategory,
  onCategoryChange,
  onNewTaskClick,
  getFilteredTasks,
  onTaskClick,
  onCheckboxChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          height: "70px",
          display: "flex",
          width: "100%",
          backgroundColor: theme.palette.grey["400"],
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => onTabChange(newValue)}
          aria-label="task tabs"
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{
            pt: 0,
            width: isMobile ? "100%" : "fit-content",
            alignSelf: "end",
          }}
          TabIndicatorProps={{
            style: { backgroundColor: theme.palette.grey["300"] },
          }}
        >
          <Tab
            label="Today's Task"
            {...a11yProps(0)}
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              "&.Mui-selected": { color: theme.palette.text.primary },
            }}
          />
          <Tab
            label="Tomorrow's Task"
            {...a11yProps(1)}
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              "&.Mui-selected": { color: theme.palette.text.primary },
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ backgroundColor: theme.palette.grey["100"], py: 2 }}>
        <CustomTabPanel value={tabValue} index={0}>
          <TabContent
            title="Today's Task"
            date={new Date()}
            tasks={tasks}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            onNewTaskClick={onNewTaskClick}
            filteredTasks={getFilteredTasks(
              tasks,
              selectedCategory,
              new Date()
            )}
            onTaskClick={onTaskClick}
            onCheckboxChange={onCheckboxChange}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <TabContent
            title="Tomorrow's Task"
            date={addDays(new Date(), 1)}
            tasks={tasks}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            onNewTaskClick={onNewTaskClick}
            filteredTasks={getFilteredTasks(
              tasks,
              selectedCategory,
              addDays(new Date(), 1)
            )}
            onTaskClick={onTaskClick}
            onCheckboxChange={onCheckboxChange}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};
