import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee.model';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee;
  constructor() {}

  ngOnInit() {
  }

}
