import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TfjsTimeseriesStocksComponent } from './tfjs-timeseries-stocks.component';

describe('TfjsTimeseriesStocksComponent', () => {
  let component: TfjsTimeseriesStocksComponent;
  let fixture: ComponentFixture<TfjsTimeseriesStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TfjsTimeseriesStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TfjsTimeseriesStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
