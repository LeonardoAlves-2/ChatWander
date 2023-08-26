import i18n from 'i18n'

export class Messages {
    get waitingForPair(): string {
        return i18n.__('waitingForPair')
    }

    get connectedToAnother(): string {
        return i18n.__('connectedToAnother')
    }

    get startChat(): string {
        return i18n.__('startChat')
    }

    get other(): string {
        return i18n.__('other')
    }

    get connectionClosed(): string {
        return i18n.__('connectionClosed')
    }
}
