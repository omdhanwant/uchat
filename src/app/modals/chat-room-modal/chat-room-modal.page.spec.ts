import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatRoomModalPage } from './chat-room-modal.page';

describe('ChatRoomModalPage', () => {
  let component: ChatRoomModalPage;
  let fixture: ComponentFixture<ChatRoomModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatRoomModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
