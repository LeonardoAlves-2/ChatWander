import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBalloonComponent } from './chat-balloon.component';

describe('ChatBalloonComponent', () => {
  let component: ChatBalloonComponent;
  let fixture: ComponentFixture<ChatBalloonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatBalloonComponent],
    });
    fixture = TestBed.createComponent(ChatBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
