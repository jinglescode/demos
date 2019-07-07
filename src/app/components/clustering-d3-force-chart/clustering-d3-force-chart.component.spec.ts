import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteringD3ForceChartComponent } from './clustering-d3-force-chart.component';

describe('ClusteringD3ForceChartComponent', () => {
  let component: ClusteringD3ForceChartComponent;
  let fixture: ComponentFixture<ClusteringD3ForceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusteringD3ForceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteringD3ForceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
