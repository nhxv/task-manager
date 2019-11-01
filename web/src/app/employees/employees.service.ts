import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  employees: Employee[] = [
    new Employee('Flaubert', 'flaubert@gmail.com'),
    new Employee('Baudelaire', 'baudelaire@gmail.com'),
    new Employee('Verne', 'verne@gmail.com'),
    new Employee('Celine', 'celine@gmail.com')
  ];
  employeesChanged = new BehaviorSubject<Employee[]>(this.employees.slice());
}
