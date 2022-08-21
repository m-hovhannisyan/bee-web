import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFieldComponent } from './components';

@NgModule({
  declarations: [FormFieldComponent],
  imports: [CommonModule, MatFormFieldModule, MatRippleModule],
  exports: [FormFieldComponent],
})
export class FormFieldModule {}
