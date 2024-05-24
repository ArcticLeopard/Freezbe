import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterWindowComponent } from './center-window.component';

describe('CenterWindowComponent', () => {
  let component: CenterWindowComponent;
  let fixture: ComponentFixture<CenterWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenterWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
