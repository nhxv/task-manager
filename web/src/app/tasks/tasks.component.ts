import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  searchForm: FormGroup;

  constructor() { }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.searchForm = new FormGroup({
      field: new FormControl('')
    });
  }

}
