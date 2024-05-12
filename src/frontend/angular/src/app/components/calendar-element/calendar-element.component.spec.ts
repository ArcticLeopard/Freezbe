import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarElementComponent} from './calendar-element.component';

describe('CalendarElementComponent', () => {
  let component: CalendarElementComponent;
  let fixture: ComponentFixture<CalendarElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarElementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
