import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, HeaderComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingSpinnerComponent,
    HeaderComponent
  ],
})
export class SharedModule {}
