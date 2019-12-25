import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Employee} from '../../employee.model';
import {EmployeeEditModalComponent} from './employee-edit-modal/employee-edit-modal.component';
import {EmployeeService} from '../../employee.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  @Input() employee: Employee;
  employeeSub: Subscription;

  constructor(private modalService: NgbModal, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeSub = this.employeeService.employeeChanged.subscribe((employeeData: Employee) => {
      this.employee = employeeData;
    });
  }

  onEdit() {
    const modalRef = this.modalService.open(EmployeeEditModalComponent);
    modalRef.componentInstance.employee = this.employee;
  }

  ngOnDestroy(): void {
    this.employeeSub.unsubscribe();
  }
}
