import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { Components } from './component/export';
import { Pages } from './pages/export';
import { ChatRoutingModule } from './chat-routing.module';
import { FormFieldModule } from '@core/module/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, ...Components, ...Pages],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChatModule {}
