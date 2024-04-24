import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseStaskDetailsComponent } from './close-stask-details.component';

describe('CloseStaskDetailsComponent', () => {
  let component: CloseStaskDetailsComponent;
  let fixture: ComponentFixture<CloseStaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseStaskDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseStaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
