import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProjectsComponent } from './active-projects.component';

describe('ActiveProjectsComponent', () => {
  let component: ActiveProjectsComponent;
  let fixture: ComponentFixture<ActiveProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
