import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WindowAddProjectComponent} from './window-add-project.component';

describe('WindowAddProjectComponent', () => {
  let component: WindowAddProjectComponent;
  let fixture: ComponentFixture<WindowAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowAddProjectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WindowAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
