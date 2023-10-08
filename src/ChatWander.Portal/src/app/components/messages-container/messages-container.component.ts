import { Component, Input } from '@angular/core';
import { Message } from 'src/app/shared/message-model';

/** Component for displaying a list of messages. */
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
  /** Input property that represents the array of messages to be displayed. */
  @Input({ required: true }) messages: Message[] = [];
}
