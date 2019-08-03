import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpSentenceEncoderComponent } from './nlp-sentence-encoder.component';

describe('NlpSentenceEncoderComponent', () => {
  let component: NlpSentenceEncoderComponent;
  let fixture: ComponentFixture<NlpSentenceEncoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlpSentenceEncoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlpSentenceEncoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
