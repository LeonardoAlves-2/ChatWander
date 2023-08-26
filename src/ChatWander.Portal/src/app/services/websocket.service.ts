import { environment } from './../../configs/config';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, takeUntil } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message, MessageType } from '../shared/message-model';

/**
 * Service for managing WebSocket communication.
 */
@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  /**
   * Create a WebSocketSubject with a default connection.
   */
  private socket$: WebSocketSubject<Message> = this.createWebSocket();
  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.disconnect();
  }

  /**
   * Create a new WebSocketSubject and configure it.
   * @returns {WebSocketSubject<Message>} The WebSocketSubject for the new connection.
   */
  private createWebSocket(): WebSocketSubject<Message> {
    return webSocket(environment.websocketUrl);
  }

  /**
   * Send a message to the WebSocket server.
   * @param {string} message - The message to send.
   */
  send(message: string): void {
    this.socket$.next({ content: message, type: MessageType.UserMessage });
  }

  /**
   * Observe incoming messages from the WebSocket server.
   * @returns {Observable<Message>} An Observable that emits incoming messages.
   */
  receive(): Observable<Message> {
    return this.socket$.asObservable().pipe(takeUntil(this.unsubscribe$));
  }

  /**
   * Disconnect from the current WebSocket and establish a new connection.
   */
  findAnotherConnection(): void {
    this.disconnect();
    this.socket$ = this.createWebSocket();
  }

  /**
   * Disconnect from the current WebSocket
   */
  disconnect(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    if (!this.socket$.closed) this.socket$.complete();
  }
}
