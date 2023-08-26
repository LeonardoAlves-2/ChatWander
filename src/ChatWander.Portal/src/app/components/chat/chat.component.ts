import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { Message, MessageType } from 'src/app/shared/message-model';
import { ConnectionStatus } from 'src/app/shared/connection-model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  isWebSocketConnected: boolean = false;
  private webSocketService: WebSocketService = inject(WebSocketService);

  ngOnInit(): void {
    this.webSocketService.receive().subscribe({
      next: (message) => {
        switch (message.type) {
          case MessageType.UserMessage:
            this.messages.push({ ...message, author: 'Other' });
            break;
          case MessageType.ServerMessage:
            if (message.type === MessageType.ServerMessage) {
              switch (message.content) {
                case ConnectionStatus.Connected:
                  this.isWebSocketConnected = true;
                  break;
                case ConnectionStatus.Disconnected:
                  this.isWebSocketConnected = false;
                  break;
                default:
                  this.messages.push(message);
                  break;
              }
            }
        }
      },
      error: (error: Event) => {
        this.isWebSocketConnected = false;
        console.error(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  sendMessage(message: string): void {
    this.webSocketService.send(message);
    this.messages.push({
      content: message,
      type: MessageType.UserMessage,
      author: 'Me', // TODO: Passar para I18N
    });
  }

  findAnotherConnection(): void {
    window.location.reload();
  }
}
