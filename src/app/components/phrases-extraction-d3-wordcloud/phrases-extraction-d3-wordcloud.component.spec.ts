import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasesExtractionD3WordcloudComponent } from './phrases-extraction-d3-wordcloud.component';

describe('PhrasesExtractionD3WordcloudComponent', () => {
  let component: PhrasesExtractionD3WordcloudComponent;
  let fixture: ComponentFixture<PhrasesExtractionD3WordcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesExtractionD3WordcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesExtractionD3WordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
