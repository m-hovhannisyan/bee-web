import { Injectable, OnInit } from '@angular/core';
import { User } from '@core/models';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  public userData: BehaviorSubject<User> = new BehaviorSubject({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  constructor(private _storageService: StorageService) {
    this.getUserData();
  }

  ngOnInit(): void {}

  public getUserData(): any {
    let chatEmail = localStorage.getItem('chat_email');
    let users: User[] = [];
    users = this._storageService.getUsers();
    for (let user of users) {
      if (user.email === chatEmail) {
        this.userData.next(user);
      }
    }
  }
}
