import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowShowShortcutsComponent } from './window-show-shortcuts.component';

describe('WindowShowShortcutsComponent', () => {
  let component: WindowShowShortcutsComponent;
  let fixture: ComponentFixture<WindowShowShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowShowShortcutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowShowShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
