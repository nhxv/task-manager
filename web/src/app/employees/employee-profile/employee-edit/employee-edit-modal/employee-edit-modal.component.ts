import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../../employee.model';

@Component({
  selector: 'app-employee-edit-modal',
  templateUrl: './employee-edit-modal.component.html'
})
export class EmployeeEditModalComponent implements OnInit {
  @Input() employee: Employee;
  editForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.employee.name, Validators.required),
      email: new FormControl(this.employee.email, [Validators.required, Validators.email])
    });
  }

  onUpdate() {
    // close modal
    this.activeModal.close('Close click');
  }

}
