import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WindowAddTaskComponent} from './window-add-task.component';

describe('WindowAddTaskComponent', () => {
  let component: WindowAddTaskComponent;
  let fixture: ComponentFixture<WindowAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowAddTaskComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WindowAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
