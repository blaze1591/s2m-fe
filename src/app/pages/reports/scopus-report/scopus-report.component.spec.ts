import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScopusReportComponent} from './scopus-report.component';

describe('ScopusReportComponent', () => {
  let component: ScopusReportComponent;
  let fixture: ComponentFixture<ScopusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScopusReportComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
