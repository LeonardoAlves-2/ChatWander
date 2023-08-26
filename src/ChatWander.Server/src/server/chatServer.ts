import WebSocket, { WebSocketServer } from 'ws'
import { Messages } from './messages'
import { Message, MessageType } from './models/messageModel'
import { ConnectionStatus } from './models/statusModel'
import i18n from 'i18n'
import http from 'http'

export class ChatServer {
    private webSocketServer: WebSocketServer
    private clients: Map<WebSocket, WebSocket | null> = new Map()
    private messagesConfig: Messages = new Messages()

    constructor(port: number) {
        this.webSocketServer = new WebSocketServer({ port })

        this.webSocketServer.on('connection', (ws: WebSocket, request) =>
            this.handleConnection(ws, request)
        )
    }

    private handleConnection(
        client: WebSocket,
        request: http.IncomingMessage
    ): void {
        const acceptLanguageHeader = request.headers['accept-language']!
        i18n.setLocale(this.parseAcceptLanguageHeader(acceptLanguageHeader))

        this.clients.set(client, null)
        this.sendServerMessage(client, this.messagesConfig.waitingForPair)

        const waitingClient = this.getWaitingClient(client)
        if (waitingClient) {
            this.clients.set(waitingClient, client)
            this.clients.set(client, waitingClient)
            this.sendServerMessage(client, ConnectionStatus.Connected)
            this.sendServerMessage(client, this.messagesConfig.startChat)

            this.sendServerMessage(waitingClient, ConnectionStatus.Connected)
            this.sendServerMessage(waitingClient, this.messagesConfig.startChat)
        }

        client.on('message', (data: WebSocket.Data) => {
            const partner = this.clients.get(client)
            if (partner) {
                this.sendMessage(partner, JSON.parse(data.toString()))
            }
        })

        client.on('close', () => {
            const partner = this.clients.get(client)
            if (partner) {
                this.clients.delete(client)
                this.clients.delete(partner)

                this.sendServerMessage(partner, ConnectionStatus.Disconnected)
                this.sendServerMessage(
                    partner,
                    this.messagesConfig.connectionClosed
                )
                partner.close()
            }
        })
    }

    private parseAcceptLanguageHeader(acceptLanguageHeader: string): string {
        const languages = acceptLanguageHeader.split(',')

        const sortedLanguages = languages
            .map((lang) => {
                const [code, quality] = lang.trim().split(';q=')
                return { code, quality: parseFloat(quality || '1') }
            })
            .sort((a, b) => b.quality - a.quality)

        const preferredLanguage = sortedLanguages[0].code
        const [languageCode] = preferredLanguage.split('-')

        return languageCode
    }

    private getWaitingClient(searcherWebSocket: WebSocket): WebSocket | null {
        for (const [client, partner] of this.clients.entries()) {
            if (
                client !== searcherWebSocket &&
                !(
                    client.readyState === WebSocket.CLOSED ||
                    client.readyState === WebSocket.CLOSING
                ) &&
                partner === null
            ) {
                return client
            }
        }

        return null
    }

    private sendMessage(client: WebSocket, message: Message): void {
        if (client.readyState === WebSocket.OPEN) {
            const messageJson = JSON.stringify(message)
            client.send(messageJson)
        }
    }

    private sendServerMessage(client: WebSocket, message: string): void {
        this.sendMessage(client, {
            content: message,
            type: MessageType.ServerMessage,
        })
    }
}
