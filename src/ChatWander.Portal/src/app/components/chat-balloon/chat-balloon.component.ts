import { Component, Input } from '@angular/core';
import { Message, MessageType } from 'src/app/shared/message-model';

@Component({
  selector: 'chat-balloon',
  template: `<span class="message-text">{{ formattedMessage }}</span>`,
})
export class ChatBalloonComponent {
  @Input({ required: true }) message!: Message;

  get formattedMessage(): string {
    return this.message.author
      ? `${this.message.author}: ${this.message.content}`
      : this.message.content;
  }
}
