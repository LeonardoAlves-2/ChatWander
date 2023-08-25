import WebSocket, { WebSocketServer } from 'ws'
import { MessageConfig } from './messageConfig'

export class ChatServer {
    private wss: WebSocketServer
    private clients: Set<WebSocket>
    private unmatchedClients: WebSocket[]
    private messagesConfig: MessageConfig
    private messagesFilePath: string = './src/config/messages.json'

    constructor(port: number) {
        this.wss = new WebSocketServer({ port })
        this.clients = new Set()
        this.unmatchedClients = []

        this.messagesConfig = MessageConfig.loadMessages(this.messagesFilePath)

        this.wss.on('connection', (ws: WebSocket) => this.handleConnection(ws))
    }

    private handleConnection(client: WebSocket): void {
        this.clients.add(client)

        if (this.unmatchedClients.length === 0) {
            this.unmatchedClients.push(client)
            this.sendMessage(
                client,
                this.messagesConfig.messages.waitingForPair
            )
        } else {
            const firstClient = client
            const secondClient = this.unmatchedClients.pop()!
            this.startChat(firstClient, secondClient)
        }

        client.on('close', () => {
            this.clients.delete(client)
            this.unmatchedClients = this.unmatchedClients.filter(
                (unmatchedClient) => unmatchedClient !== client
            )
        })
    }

    private startChat(firstClient: WebSocket, secondClient: WebSocket): void {
        this.sendMessage(firstClient, this.messagesConfig.messages.startChat)

        this.sendMessage(
            secondClient,
            this.messagesConfig.messages.connectedToAnother
        )

        firstClient.on('message', (data: WebSocket.Data) =>
            this.sendMessage(secondClient, data.toString())
        )
        secondClient.on('message', (data: WebSocket.Data) =>
            this.sendMessage(firstClient, data.toString())
        )
    }

    private sendMessage(client: WebSocket, message: string): void {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message)
        }
    }
}
