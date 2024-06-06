import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowRenameComponent } from './window-rename.component';

describe('WindowRenameComponent', () => {
  let component: WindowRenameComponent;
  let fixture: ComponentFixture<WindowRenameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowRenameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
