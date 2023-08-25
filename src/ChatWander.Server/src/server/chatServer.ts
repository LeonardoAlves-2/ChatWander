import WebSocket, { WebSocketServer } from 'ws'
import fs from 'fs'
import { MessageConfig } from './messageConfig'

export class ChatServer {
    private wss: WebSocketServer
    private clients: Set<WebSocket>
    private unmatchedClients: WebSocket[]
    private messagesConfig: MessageConfig

    constructor(port: number) {
        this.wss = new WebSocketServer({ port })
        this.clients = new Set()
        this.unmatchedClients = []

        this.messagesConfig = MessageConfig.loadMessages(
            './src/config/messages.json'
        )

        this.wss.on('connection', (ws) => this.handleConnection(ws))
    }

    private handleConnection(client: WebSocket) {
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

    private startChat(firstClient: WebSocket, secondClient: WebSocket) {
        this.sendMessage(firstClient, this.messagesConfig.messages.startChat)

        this.sendMessage(
            secondClient,
            this.messagesConfig.messages.connectedToAnother
        )

        firstClient.on('message', (data) =>
            this.sendMessage(secondClient, data.toString())
        )
        secondClient.on('message', (data) =>
            this.sendMessage(firstClient, data.toString())
        )
    }

    private sendMessage(client: WebSocket, message: string) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message)
        }
    }
}
