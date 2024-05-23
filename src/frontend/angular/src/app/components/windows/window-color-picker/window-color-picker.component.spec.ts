import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowColorPickerComponent } from './window-color-picker.component';

describe('WindowColorPickerComponent', () => {
  let component: WindowColorPickerComponent;
  let fixture: ComponentFixture<WindowColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowColorPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
