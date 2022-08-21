import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL } from '@core/constants';
import { User } from '@core/models';
import { StorageService } from '@core/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;
  public emailErr: boolean = false;
  users!: User[];

  constructor(
    private _fb: FormBuilder,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._initSignUpForm();
  }

  private _initSignUpForm(): void {
    this.signupForm = this._fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(EMAIL)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public saveForm(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.emailErr = false;
    const users = this._storageService.getUsers();
    const body: User = this.signupForm.value;

    if (users.length) {
      for (let user of users) {
        if (user.email === this.signupForm.get('email')?.value) {
          this.emailErr = true;
          return;
        }
      }
    }
    this._storageService.addUser(body);
  }
}
