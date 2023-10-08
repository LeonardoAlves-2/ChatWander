import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'src/app/shared/message-model';

/** Angular component for displaying chat message balloon. */
@Component({
  selector: 'chat-balloon',
  template: `<span class="message-text">{{ formattedMessage }}</span>`,
})
export class ChatBalloonComponent {
  /** Input property representing the message to be displayed. */
  @Input({ required: true }) message!: Message;

  constructor(public translateService: TranslateService) {}

  /**
   * Gets the formatted message text, including the author if available and translated.
   * @returns The formatted message text.
   */
  get formattedMessage(): string {
    return this.message.author
      ? `${this.getAuthorWithTranslation(this.message.author)}: ${
          this.message.content
        }`
      : this.message.content;
  }

  /**
   * Gets the translated author name using the ngx-translate service.
   * @param author - The author name to be translated.
   * @returns The translated author name.
   */
  private getAuthorWithTranslation(author: string): string {
    return this.translateService.instant(author);
  }
}
