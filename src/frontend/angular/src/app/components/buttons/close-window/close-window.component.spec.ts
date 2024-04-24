import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWindowComponent } from './close-window.component';

describe('CloseWindowComponent', () => {
  let component: CloseWindowComponent;
  let fixture: ComponentFixture<CloseWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
