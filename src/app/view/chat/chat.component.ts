import { Component, OnInit } from '@angular/core';
import { User } from '@core/models';
import { StorageService, UserService } from '@core/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private _userService: UserService) {
    this._userService.getUserData();
  }

  ngOnInit(): void {}
}
