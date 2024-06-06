import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowEditComponent } from './window-edit.component';

describe('WindowEditComponent', () => {
  let component: WindowEditComponent;
  let fixture: ComponentFixture<WindowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
