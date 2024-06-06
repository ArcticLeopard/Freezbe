import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailMenuComponent} from './detail-menu.component';

describe('DetailMenuComponent', () => {
  let component: DetailMenuComponent;
  let fixture: ComponentFixture<DetailMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
