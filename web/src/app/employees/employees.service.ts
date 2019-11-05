import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeesAccessService} from '../data-access/employees-access.service';
import {BehaviorSubject} from 'rxjs';

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

  updateEmployee(id: number, employeeUpdate: Employee) {
    this.employeesAccessService.updateEmployee(id, employeeUpdate).subscribe(() => {
      this.employeesAccessService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  changeEmployeeTask() {
    this.employeesAccessService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
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
}
