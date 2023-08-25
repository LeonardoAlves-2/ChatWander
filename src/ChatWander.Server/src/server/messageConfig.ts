import fs from 'fs'

export class MessageConfig {
    public messages: {
        waitingForPair: string
        connectedToAnother: string
        startChat: string
    }

    constructor(messages: {
        waitingForPair: string
        connectedToAnother: string
        startChat: string
    }) {
        this.messages = messages
    }

    static loadMessages(fileName: string) {
        try {
            const data = fs.readFileSync(fileName, 'utf8')
            const messages = JSON.parse(data)
            return new MessageConfig(messages)
        } catch (error) {
            console.error(`Error reading the file ${fileName}: ${error}`)
            return new MessageConfig({
                waitingForPair: 'Waiting for more users to pair...',
                connectedToAnother:
                    'You are connected to another person. Start chatting!',
                startChat:
                    'You are connected to another person. Start chatting!',
            })
        }
    }
}
