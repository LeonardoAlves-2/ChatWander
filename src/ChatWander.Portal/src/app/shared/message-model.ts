export interface Message {
  content: string;
  type: MessageType;
  author?: string;
}

export enum MessageType {
  UserMessage = 'user',
  ServerMessage = 'server',
}
