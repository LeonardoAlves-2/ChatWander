import { i18nConfig } from './config/i18nConfig'
import { ChatServer } from './server/chatServer'
import i18n from 'i18n'

i18n.configure(i18nConfig)

new ChatServer(8080)
