import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule,LoadingSpinnerComponent],
})
export class SharedModule {}
