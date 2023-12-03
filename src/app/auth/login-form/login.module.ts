
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [LoginRoutingModule,SharedModule,CommonModule],
  // Other module configuration...
})
export class LoginModule {}

