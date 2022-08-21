import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_FORM_FIELD, useExisting: FormFieldComponent },
  ]
})
export class FormFieldComponent extends MatFormField {

  @Input() color: ThemePalette = 'primary';
  @Input() classList: string | string[] = '';
  @Input() prefixClass: string | string[] = '';
  @Input() suffixClass: string | string[] = '';
  @Input() prefixDisabled: boolean = false;
  @Input() suffixDisabled: boolean = false;

  _hideControlPlaceholder = () => false;

}
