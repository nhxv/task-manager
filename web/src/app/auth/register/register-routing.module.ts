import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {RouterModule} from '@angular/router';

const registerRoutes = [
  {path: '', component: RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forChild(registerRoutes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
