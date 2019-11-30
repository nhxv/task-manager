import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeeApiService} from '../api/employee-api.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  employees: Employee[] = [];
  employeesChanged = new BehaviorSubject<Employee[]>(this.employees.slice());
  employee: Employee = null;
  employeeChanged = new BehaviorSubject<Employee>({...this.employee});

  constructor(private employeeApiService: EmployeeApiService) {}

  getEmployeeList() {
    this.employeeApiService.getEmployeeList().subscribe((employeeData: Employee[]) => {
      this.employees = employeeData;
      this.employeesChanged.next(this.employees.slice());
    });
  }

  getEmployee(username: string) {
    this.employeeApiService.getEmployeeByUsername(username).subscribe((employeeData: Employee) => {
      this.employee = employeeData;
      this.employeeChanged.next({...this.employee});
    });
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
