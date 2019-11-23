import {Task} from '../tasks/task.model';

export class Employee {
  constructor(
    public name: string,
    public email: string,
    public username: string,
    public password: string,
    public task?: Task,
    public id?: number
  ) {}

}
