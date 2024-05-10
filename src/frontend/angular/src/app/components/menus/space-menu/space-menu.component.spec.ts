import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpaceMenuComponent} from './space-menu.component';

describe('SpaceMenuComponent', () => {
  let component: SpaceMenuComponent;
  let fixture: ComponentFixture<SpaceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpaceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
