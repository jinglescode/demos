import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtPlaygroundComponent } from './devt-playground.component';

describe('DevtPlaygroundComponent', () => {
  let component: DevtPlaygroundComponent;
  let fixture: ComponentFixture<DevtPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevtPlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevtPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
