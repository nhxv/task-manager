import {Task} from '../tasks/task.model';

export class Employee {
  constructor(public name: string, public email: string, public task?: Task) {}

}
