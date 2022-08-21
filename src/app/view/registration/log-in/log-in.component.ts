import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL } from '@core/constants';
import { StorageService } from '@core/services';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public loginForm!: FormGroup;
  public wrongEmail: boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public saveForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.wrongEmail = false;
    const users = this._storageService.getUsers();
    if (users?.length) {
      for (let user of users) {
        if (
          user.email === this.loginForm.get('email')?.value &&
          user.password === this.loginForm.get('password')?.value
        ) {
          this._storageService.logIn(this.loginForm.get('email')?.value);
          return;
        }
      }
    }
    this.wrongEmail = true;
  }
}
