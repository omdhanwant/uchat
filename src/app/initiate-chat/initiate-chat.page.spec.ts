import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitiateChatPage } from './initiate-chat.page';

describe('InitiateChatPage', () => {
  let component: InitiateChatPage;
  let fixture: ComponentFixture<InitiateChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitiateChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
