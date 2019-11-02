import {Employee} from '../employees/employee.model';

export class Task {
  constructor(public name: string, public description: string, public employee: Employee, public id?: number) {}
}
