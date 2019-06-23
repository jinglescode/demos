import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnistComponent } from './mnist.component';

describe('MnistComponent', () => {
  let component: MnistComponent;
  let fixture: ComponentFixture<MnistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
