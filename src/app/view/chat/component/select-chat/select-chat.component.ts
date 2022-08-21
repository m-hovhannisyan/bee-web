import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '@core/models';
import { StorageService, UserService } from '@core/services';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-select-chat',
  templateUrl: './select-chat.component.html',
  styleUrls: ['./select-chat.component.scss'],
})
export class SelectChatComponent implements OnInit, OnDestroy {
  public connectionEmail!: string;
  public _routerSubscription!: Subscription;
  private _userInfoSubscription!: Subscription;
  public connections: User[] = [];
  private _firstGet: boolean = true;
  public userData!: User;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _userService: UserService
  ) {
    this._routerEventSubscribe();
    this._userInfoSubscription = this._userService.userData.subscribe(
      (data) => {
        this.userData = data;
      }
    );
  }

  ngOnInit(): void {}

  private _routerEventSubscribe(): void {
    this._routerSubscription = this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe((data: NavigationEnd) => {
        if (data?.url) {
          const urlItems = data.url.split('/');
          if (urlItems[3]) {
            this.connectionEmail = urlItems[3];
            this._firstGet = false;
            this._getChats();
            return;
          } else {
            this._getChats();
          }
        }
      });
  }

  private _getChats(): void {
    let data = this._storageService.getUsers();
    if (!data.length) {
      return;
    }
    for (let [index, user] of data.entries()) {
      if (user.email === this.userData?.email) {
        data.splice(index, 1);
      }
    }
    this.connections = data;
    if (this._firstGet && this.connections.length) {
      this._router.navigate(['profile', 'chat', this.connections[0].email]);
    }
  }

  public selectChat(connectionInfo: User): void {
    this._router.navigate(['profile', 'chat', connectionInfo.email]);
  }

  ngOnDestroy(): void {
    this._routerSubscription?.unsubscribe();
    this._userInfoSubscription?.unsubscribe;
  }
}
