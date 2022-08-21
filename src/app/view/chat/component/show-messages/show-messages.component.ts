import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Message, User } from '@core/models';
import { StorageService, UserService } from '@core/services';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.scss'],
})
export class ShowMessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  public messages: any[] = [];
  public messageForm!: FormGroup;
  private _paramSubscription!: Subscription;
  public userData!: User;
  public connectionData!: User;
  private _connectionEmail!: string;
  @ViewChild('selectContainer') private selectContainer!: ElementRef;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
    this._routerParamSubscribe();
    this._userService.userData.subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit(): void {
    this._initMessageForm();
  }

  ngAfterViewInit(): void {
    if (this.selectContainer) {
      this.selectContainer.nativeElement.scrollTop =
        this.selectContainer.nativeElement.scrollHeight;
    }
  }

  private _initMessageForm(): void {
    this.messageForm = this._fb.group({
      message: [null],
    });
  }

  private _routerParamSubscribe(): void {
    this._paramSubscription = this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe((data: NavigationEnd) => {
        if (data?.url) {
          const urlItems = data.url.split('/');
          if (urlItems[3]) {
            this.messages = [];
            this._connectionEmail = urlItems[3];
            this._getMessages();
            this._getConnectionData();
          }
        }
      });
  }

  private _getMessages(): void {
    let allMessages = this._storageService.getMessages(this._connectionEmail);
    this.messages = allMessages.sort((a, b) => {
      return <any>new Date(a.date) - <any>new Date(b.date);
    });
  }

  private _getConnectionData(): void {
    this.connectionData = this._storageService.getConnectionData(
      this._connectionEmail
    );
  }

  public sendMessage(): void {
    if (!this.messageForm.get('message')?.value) {
      return;
    }
    const body: Message = {
      message: this.messageForm.get('message')?.value,
      sender_email: this.userData?.email,
      receiver_email: this._connectionEmail,
      date: new Date(),
    };
    this._storageService.addMessage(body);
    this.messageForm.get('message')?.patchValue(null);
    this._getMessages();
  }

  ngOnDestroy(): void {
    this._paramSubscription?.unsubscribe();
  }
}
