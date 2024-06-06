import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CloseWorkspaceComponent} from './close-workspace.component';

describe('CloseWorkspaceComponent', () => {
  let component: CloseWorkspaceComponent;
  let fixture: ComponentFixture<CloseWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseWorkspaceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CloseWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
