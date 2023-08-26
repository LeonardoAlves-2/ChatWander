export interface Message {
    content: string
    type: MessageType
}

export enum MessageType {
    UserMessage = 'user',
    ServerMessage = 'server',
}
