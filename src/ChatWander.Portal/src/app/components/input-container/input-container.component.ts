import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
})
export class InputContainerComponent {
  @Input({ required: true }) disabled = false;
  @Output() onSendMessage = new EventEmitter<string>();
  @Output() onFindAnotherConnection = new EventEmitter();
  message: string = '';

  onSend(): void {
    this.onSendMessage.emit(this.message);
    this.message = '';
  }
}
