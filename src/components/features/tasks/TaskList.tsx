import { Grid2 } from "@mui/material";
import { Task } from "@todolist/core/models/task.model";
import { TaskCard } from "@todolist/components/common/taskCards";

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onCheckboxChange: (taskId: string, isCompleted: boolean) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskClick,
  onCheckboxChange,
}) => (
  <Grid2 container spacing={3}>
    {tasks.map((task: Task) => (
      <Grid2 size={{ xs: 12, md: 6 }} key={task._id}>
        <TaskCard
          {...task}
          onClick={() => onTaskClick(task)}
          onCheckboxChange={onCheckboxChange}
        />
      </Grid2>
    ))}
  </Grid2>
);
