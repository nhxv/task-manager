import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeesApiService} from '../api/employees-api.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  employees: Employee[] = [];
  employeesChanged = new BehaviorSubject<Employee[]>(this.employees.slice());

  constructor(private employeesApiService: EmployeesApiService) {
    this.employeesApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  createEmployee(employee: Employee) {
    this.employeesApiService.createEmployee(employee).subscribe(() => {
      this.employeesApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  updateEmployee(id: number, employeeUpdate: Employee) {
    this.employeesApiService.updateEmployee(id, employeeUpdate).subscribe(() => {
      this.employeesApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  changeEmployeeTask() {
    this.employeesApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  deleteEmployee(id: number) {
    this.employeesApiService.deleteEmployee(id).subscribe(() => {
      this.employeesApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }
}
