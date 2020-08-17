import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEarthPotentialRiseComponent } from './review-earth-potential-rise.component';

describe('ReviewEarthPotentialRiseComponent', () => {
  let component: ReviewEarthPotentialRiseComponent;
  let fixture: ComponentFixture<ReviewEarthPotentialRiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEarthPotentialRiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEarthPotentialRiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
