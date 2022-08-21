import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Message, User } from '@core/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private _router: Router) {}

  public addUser(body: User): void {
    let users: User[] = [];
    users = this.getUsers();
    users.push(body);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('chat_email', body.email);
    this._router.navigate(['profile']);
  }

  public getUsers(): User[] | [] {
    let users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users);
    }
    return [];
  }

  public getConnectionData(email: string): any {
    let users = this.getUsers();
    for (let user of users) {
      if (user.email === email) {
        return user;
      }
    }
  }

  public logIn(email: string): void {
    localStorage.removeItem('chat_email');
    localStorage.setItem('chat_email', email);
    this._router.navigate(['profile']);
  }

  public logOut(): void {
    localStorage.removeItem('chat_email');
    this._router.navigate(['auth', 'login']);
  }

  public getMessages(email: string): Message[] {
    let localMessage = localStorage.getItem('messages');
    let messages: Message[] = [];
    if (localMessage) {
      messages = JSON.parse(localMessage);
    } else {
      return [];
    }
    const myMessages: Message[] = [];
    let myEmail = localStorage.getItem('chat_email');
    for (let message of messages) {
      if (
        (message.receiver_email === myEmail &&
          message.sender_email === email) ||
        (message.sender_email === myEmail && message.receiver_email === email)
      ) {
        myMessages.push(message);
      }
    }
    return myMessages;
  }

  public addMessage(body: Message) {
    let messages: Message[] = [];
    let localMessage = localStorage.getItem('messages');
    if (localMessage) {
      messages = JSON.parse(localMessage);
    }
    messages.push(body);
    localStorage.setItem('messages', JSON.stringify(messages));
  }
}
