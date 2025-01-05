import { ITaskDTO, ITaskFormValues } from '@todolist/core/models/taskForm.models';
import { dateTimeUtils } from '../utils/dateTime.utils';

export class TaskMapper {
  static toDTO(formValues: ITaskFormValues): ITaskDTO {
    return {
      description: formValues.description,
      title: formValues.title,
      start_date: dateTimeUtils.createDateTime(formValues.startDate, formValues.startTime),
      end_date: dateTimeUtils.createDateTime(formValues.endDate, formValues.endTime)
    };
  }
}