import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthingGraphComponent } from './earthing-graph.component';

describe('EarthingGraphComponent', () => {
  let component: EarthingGraphComponent;
  let fixture: ComponentFixture<EarthingGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthingGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
