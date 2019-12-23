import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../employee.model';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../employee.service';
import {EmployeeEditModalComponent} from './employee-edit-modal/employee-edit-modal.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent {
  @Input() employee: Employee;

  constructor(private modalService: NgbModal) {}

  onEdit() {
    const modalRef = this.modalService.open(EmployeeEditModalComponent);
    modalRef.componentInstance.employee = this.employee;
  }
}
