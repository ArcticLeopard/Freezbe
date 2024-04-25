import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSidebarComponent } from './close-sidebar.component';

describe('CloseSidebarComponent', () => {
  let component: CloseSidebarComponent;
  let fixture: ComponentFixture<CloseSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
