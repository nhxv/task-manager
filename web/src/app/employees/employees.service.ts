import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeeApiService} from '../api/employee-api.service';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  employees: Employee[] = [];
  employeesChanged = new BehaviorSubject<Employee[]>(this.employees.slice());

  constructor(private employeeApiService: EmployeeApiService, private authService: AuthService) {}

  getEmployeeList() {
    this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  getEmployeeByUsername(username: string) {
    this.employeeApiService.getEmployeeByUsername(username);
  }

  createEmployee(employee: Employee) {
    this.employeeApiService.createEmployee(employee).subscribe(data => {
      console.log(data);
    });
    this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  updateEmployee(id: number, employeeUpdate: Employee) {
    this.employeeApiService.updateEmployee(id, employeeUpdate).subscribe(() => {
      this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }

  changeEmployeeTask() {
    this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  deleteEmployee(id: number) {
    this.employeeApiService.deleteEmployee(id).subscribe(() => {
      this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
        this.employees = employeeData;
        this.employeesChanged.next(this.employees.slice());
      });
    });
  }
}
