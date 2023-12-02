import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [AuthComponent,LoginFormComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports:[LoginFormComponent],
})
export class AuthModule {}
