import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigComponent } from './big.component';

describe('BigComponent', () => {
  let component: BigComponent;
  let fixture: ComponentFixture<BigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
