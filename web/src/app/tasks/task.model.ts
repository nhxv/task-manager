import {Employee} from '../employees/employee.model';

export class Task {
  constructor(public name: string, public description: string, public id?: number, public employee?: Employee) {}

}
