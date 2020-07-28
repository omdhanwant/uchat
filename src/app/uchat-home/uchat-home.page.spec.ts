import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UchatHomePage } from './uchat-home.page';

describe('UchatHomePage', () => {
  let component: UchatHomePage;
  let fixture: ComponentFixture<UchatHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UchatHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UchatHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
