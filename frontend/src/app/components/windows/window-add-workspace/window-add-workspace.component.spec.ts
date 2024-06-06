import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowAddWorkspaceComponent } from './window-add-workspace.component';

describe('WindowAddWorkspaceComponent', () => {
  let component: WindowAddWorkspaceComponent;
  let fixture: ComponentFixture<WindowAddWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowAddWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowAddWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
