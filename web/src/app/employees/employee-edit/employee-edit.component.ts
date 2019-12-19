import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../employee.model';
import {Subscription} from 'rxjs';
import {EmployeeApiService} from '../../api/employee-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  employeeEdit: Employee;
  employeeEditSub: Subscription;
  editForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private employeeApiService: EmployeeApiService) {}

  ngOnInit(): void {
    this.employeeEditSub = this.employeeApiService.getEmployeeByUsername(sessionStorage.getItem('username')).subscribe((employeeData: Employee) => {
      this.employeeEdit = employeeData;
    });
    this.initForm();
  }

  initForm() {
    this.editForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    // close modal
    this.activeModal.close('Close click');
  }

  ngOnDestroy(): void {

  }
}
