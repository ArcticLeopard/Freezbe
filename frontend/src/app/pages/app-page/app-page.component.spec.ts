import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppPageComponent} from './app-page.component';

describe('AppPageComponent', () => {
  let component: AppPageComponent;
  let fixture: ComponentFixture<AppPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
