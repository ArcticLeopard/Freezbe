import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigButtonComponent } from './big-button.component';

describe('BigButtonComponent', () => {
  let component: BigButtonComponent;
  let fixture: ComponentFixture<BigButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
