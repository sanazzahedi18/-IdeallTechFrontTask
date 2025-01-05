export interface ITaskFormValues {
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    description: string;
  }
  
  export interface ITaskDTO {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
  }