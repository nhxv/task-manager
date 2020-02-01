import {Employee} from '../employees/employee.model';

export class Task {
  constructor(
    public name: string,
    public description: string,
    public deadline: string,
    public employee: Employee,
    public status: string,
    public id?: number
  ) {}
}
