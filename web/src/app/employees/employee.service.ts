import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeeApiService} from '../api/employee-api.service';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  employees: Employee[] = [];
  employeesChanged = new BehaviorSubject<Employee[]>(this.employees.slice());
  employee: Employee = null;
  employeeChanged = new BehaviorSubject({...this.employee});

  constructor(private employeeApiService: EmployeeApiService, private authService: AuthService) {}

  getEmployeeList() {
    this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  getEmployee(username: string) {
    this.employeeApiService.getEmployeeByUsername(username).subscribe((employeeData: Employee) => {
      this.setEmployee(employeeData);
    });
  }

  setEmployee(employee: Employee) {
    this.employee = employee;
    this.employeeChanged.next({...this.employee});
  }

  createEmployee(employee: Employee) {
    this.employeeApiService.createEmployee(employee).subscribe(data => {
      console.log(data);
    });
    this.employeeApiService.getEmployeeList().subscribe((employeesData: Employee[]) => {
      this.employees = employeesData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  updateEmployee(id: number, employeeUpdate: Employee) {
    this.employeeApiService.updateEmployee(id, employeeUpdate).subscribe(() => {
      if (this.authService.isAdmin()) {
        this.employeeApiService.getEmployeeList().subscribe((employeesData: Employee[]) => {
          this.employees = employeesData;
          this.employeesChanged.next(this.employees.slice());
        });
      }
      this.employeeApiService.getEmployee(id).subscribe((employeeData: Employee) => {
        this.setEmployee(employeeData);
      });
    });
  }

  changeEmployeeTask() {
    if (this.authService.isAdmin()) {
      this.employeeApiService.getEmployeeList().subscribe((employeesData: Employee[]) => {
        this.employees = employeesData;
        this.employeesChanged.next(this.employees.slice());
      });
    }
  }

  deleteEmployee(id: number) {
    this.employeeApiService.deleteEmployee(id).subscribe(() => {
      if (this.authService.isAdmin()) {
        this.employeeApiService.getEmployeeList().subscribe((employeesData: Employee[]) => {
          this.employees = employeesData;
          this.employeesChanged.next(this.employees.slice());
        });
      }
    });
  }
}
