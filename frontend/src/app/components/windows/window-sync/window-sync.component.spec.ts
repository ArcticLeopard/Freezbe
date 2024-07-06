import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowSyncComponent } from './window-sync.component';

describe('WindowSyncComponent', () => {
  let component: WindowSyncComponent;
  let fixture: ComponentFixture<WindowSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowSyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
