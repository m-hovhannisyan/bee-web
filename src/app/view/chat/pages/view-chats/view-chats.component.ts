import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services';

@Component({
  selector: 'app-view-chats',
  templateUrl: './view-chats.component.html',
  styleUrls: ['./view-chats.component.scss'],
})
export class ViewChatsComponent implements OnInit {
  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {}

  public logOut() {
    localStorage.removeItem('chat_email');
    this._router.navigate(['auth', 'login']);
    this._userService.userData.next({
      name: '',
      surname: '',
      email: '',
      password: '',
    });
  }
}
