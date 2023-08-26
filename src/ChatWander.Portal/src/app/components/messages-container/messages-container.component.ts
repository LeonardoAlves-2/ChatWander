import { Component, Input } from '@angular/core';
import { Message } from 'src/app/shared/message-model';

@Component({
  selector: 'messages-container',
  template: `<section class="messages-container">
    <div *ngFor="let message of messages" class="messages-container-chat">
      <chat-balloon [message]="message" />
    </div>
  </section>`,
  styleUrls: ['./messages-container.component.scss'],
})
export class MessagesContainerComponent {
  @Input({ required: true }) messages: Message[] = [];
}
