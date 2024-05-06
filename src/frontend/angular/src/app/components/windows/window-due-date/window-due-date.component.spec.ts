import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDueDateComponent } from './window-due-date.component';

describe('WindowDueDateComponent', () => {
  let component: WindowDueDateComponent;
  let fixture: ComponentFixture<WindowDueDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowDueDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
