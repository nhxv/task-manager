import {Task} from '../tasks/task.model';

export class Employee {
  constructor(
    public username: string,
    public password: string,
    public name: string,
    public email: string,
    public task?: Task,
    public id?: number
  ) {}

}
