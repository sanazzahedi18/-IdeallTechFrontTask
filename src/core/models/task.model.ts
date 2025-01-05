
export interface Task {
  _id: string;
  title: string;
  description: string;
  start_date: string | Date;
  end_date: string | Date;
  is_completed: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}