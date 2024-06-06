import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CloseTaskDetailsComponent} from './close-task-details.component';

describe('CloseTaskDetailsComponent', () => {
  let component: CloseTaskDetailsComponent;
  let fixture: ComponentFixture<CloseTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseTaskDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CloseTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
