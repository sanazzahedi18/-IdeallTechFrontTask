
import { CategoryType } from "@todolist/core/models/category.models";
import { Task } from "@todolist/core/models/task.model";
import { TabHeader } from "@todolist/components/common/TabHeader";
import { CategoryChips } from "@todolist/components/common/categoryChips";
import { TaskList } from "../tasks/TaskList";

interface TabContentProps {
  title: string;
  date: Date;
  tasks: Task[];
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  onNewTaskClick: () => void;
  filteredTasks: Task[];
  onTaskClick: (task: Task) => void;
  onCheckboxChange: (taskId: string, isCompleted: boolean) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  title,
  date,
  tasks,
  selectedCategory,
  onCategoryChange,
  onNewTaskClick,
  filteredTasks,
  onTaskClick,
  onCheckboxChange,
}) => (
  <>
    <TabHeader
      title={title}
      date={date}
      handleNewTaskClick={onNewTaskClick}
    />
    <CategoryChips
      tasks={tasks}
      date={date}
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
    />
    <TaskList
      tasks={filteredTasks}
      onTaskClick={onTaskClick}
      onCheckboxChange={onCheckboxChange}
    />
  </>
);
