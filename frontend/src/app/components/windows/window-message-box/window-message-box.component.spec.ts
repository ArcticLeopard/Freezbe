import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowMessageBoxComponent } from './window-message-box.component';

describe('WindowMessageBoxComponent', () => {
  let component: WindowMessageBoxComponent;
  let fixture: ComponentFixture<WindowMessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowMessageBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
