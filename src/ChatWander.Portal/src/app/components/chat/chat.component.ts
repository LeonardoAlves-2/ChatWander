import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { Message, MessageType } from 'src/app/shared/message-model';
import { ConnectionStatus } from 'src/app/shared/connection-model';

/** Component for the chat interface. */
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
        this.handleWebSocketMessage(message);
      },
      error: (error: Event) => {
        this.handleWebSocketError(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  /**
   * Sends a message via WebSocket and adds the user's message to the chat.
   * @param message - The message to be sent.
   */
  sendMessage(message: string): void {
    this.webSocketService.send(message);
    this.addUserMessage(message);
  }

  /** Finds another connection by reloading the page. */
  findAnotherConnection(): void {
    window.location.reload();
  }

  /**
   * Handles WebSocket messages based on their type.
   * @param message - The WebSocket message to be handled.
   */
  private handleWebSocketMessage(message: Message): void {
    switch (message.type) {
      case MessageType.UserMessage:
        this.addAnonymousUserMessage(message);
        break;
      case MessageType.ServerMessage:
        this.handleServerMessage(message);
        break;
    }
  }

  /**
   * Handles WebSocket errors and updates the connection status.
   * @param error - The WebSocket error event.
   */
  private handleWebSocketError(error: Event): void {
    this.isWebSocketConnected = false;
    console.error(error);
  }

  /**
   * Handles server-specific WebSocket messages.
   * @param message - The server WebSocket message.
   */
  private handleServerMessage(message: Message): void {
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

  /**
   * Adds a user message to the chat.
   * @param message - The user's message.
   */
  private addUserMessage(message: string): void {
    this.messages.push({
      content: message,
      type: MessageType.UserMessage,
      author: 'You',
    });
  }

  /**
   * Adds an anonymous user message to the chat.
   * @param message - The anonymous user's message.
   */
  private addAnonymousUserMessage(message: Message): void {
    this.messages.push({ ...message, author: 'Anonymous' });
  }
}
