import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowChooseActionComponent } from './window-choose-action.component';

describe('WindowChooseActionComponent', () => {
  let component: WindowChooseActionComponent;
  let fixture: ComponentFixture<WindowChooseActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowChooseActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowChooseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
