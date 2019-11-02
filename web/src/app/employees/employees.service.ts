import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {BehaviorSubject} from 'rxjs';
import {EmployeesAccessService} from '../data-access/employees-access.service';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  employees: Employee[] = [];
  employeesChanged = new BehaviorSubject<Employee[]>(this.employees.slice());

  constructor(private employeesAccessService: EmployeesAccessService) {
    this.employeesAccessService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  createEmployee(employee: Employee) {
    this.employeesAccessService.createEmployee(employee).subscribe(() => {
      this.employeesAccessService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  updateEmployee(id: number, employee: Employee) {
    this.employeesAccessService.updateEmployee(id, employee).subscribe(() => {
      this.employeesAccessService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  deleteEmployee(id: number) {
    this.employeesAccessService.deleteEmployee(id).subscribe(() => {
      this.employeesAccessService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  getEmployees() {
    return this.employees.slice();
  }

  getEmployeeByName(employeeName: string) {
    // need to change to get by Id
    for (let employee of this.employees) {
      if (employee.name === employeeName) {
        return employee;
      }
    }
  }
}
