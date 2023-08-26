import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from './services/websocket.service';
import { ChatBalloonComponent } from './components/chat-balloon/chat-balloon.component';
import { MessagesContainerComponent } from './components/messages-container/messages-container.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatBalloonComponent,
    MessagesContainerComponent,
    InputContainerComponent,
    HeaderLayoutComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [WebSocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
