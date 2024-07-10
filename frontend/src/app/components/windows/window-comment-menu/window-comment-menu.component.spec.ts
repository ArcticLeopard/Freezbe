import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCommentMenuComponent } from './window-comment-menu.component';

describe('WindowCommentMenuComponent', () => {
  let component: WindowCommentMenuComponent;
  let fixture: ComponentFixture<WindowCommentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowCommentMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowCommentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
