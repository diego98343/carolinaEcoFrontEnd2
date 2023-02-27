import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogInComponent } from './user-log-in.component';

describe('UserLogInComponent', () => {
  let component: UserLogInComponent;
  let fixture: ComponentFixture<UserLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
