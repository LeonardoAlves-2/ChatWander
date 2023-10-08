/** Represents a message object. */
export interface Message {
  /** The content of the message. */
  content: string;

  /** The type of the message. It can be one of the predefined message types. */
  type: MessageType;

  /** (Optional) The author of the message. This property is only present for user messages. */
  author?: string;
}

/** Enum representing the types of messages. */
export enum MessageType {
  /** Represents a user-generated message. */
  UserMessage = 'user',

  /** Represents a server-generated message. */
  ServerMessage = 'server',
}
