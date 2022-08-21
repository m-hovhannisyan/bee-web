import { Component, Input, OnInit } from '@angular/core';
import { User } from '@core/models';
import { ImagesService } from '@core/services';

@Component({
  selector: 'app-connection-item',
  templateUrl: './connection-item.component.html',
  styleUrls: ['./connection-item.component.scss'],
})
export class ConnectionItemComponent implements OnInit {
  @Input() userInfo!: User;
  constructor(public imagesService: ImagesService) {}

  ngOnInit(): void {}
}
