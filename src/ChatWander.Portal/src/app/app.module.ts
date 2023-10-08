import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WebSocketService } from './services/websocket.service';
import { ChatBalloonComponent } from './components/chat-balloon/chat-balloon.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessagesContainerComponent } from './components/messages-container/messages-container.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatBalloonComponent,
    MessagesContainerComponent,
    InputContainerComponent,
    HeaderLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'pt']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|pt/) ? browserLang : 'en');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
