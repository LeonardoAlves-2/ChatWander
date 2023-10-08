import { Component, Input, Output } from '@angular/core';
import { Subject, throttleTime } from 'rxjs';

/** Component for the input container. */
@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
})
export class InputContainerComponent {
  /** Indicates whether the inputs is disabled or not. */
  @Input({ required: true }) disabled = false;

  /** The message to be sent. */
  message: string = '';

  private sendMessageSubject = new Subject<string>();

  /** Event emitter for sending a message. Emits the message after a debounce time of 300 milliseconds. */
  @Output() onSendMessage = this.sendMessageSubject.pipe(throttleTime(300));

  private findConnectionSubject = new Subject<void>();

  /** Event emitter for finding another connection. Emits the event after a debounce time of 300 milliseconds. */
  @Output() onFindAnotherConnection = this.findConnectionSubject.pipe(
    throttleTime(300)
  );

  /** Handles the action of sending a message. */
  onSend(): void {
    if (this.isMessageValid()) {
      this.sendMessageSubject.next(this.message);
      this.message = '';
    }
  }

  /** Handles the action of finding another connection. */
  onFindConnection(): void {
    this.findConnectionSubject.next();
  }

  /**
   * Checks if the current message is valid (not empty after trimming).
   * @returns {boolean} True if the message is valid, false otherwise.
   */
  isMessageValid(): boolean {
    return this.message.trim() !== '';
  }
}
