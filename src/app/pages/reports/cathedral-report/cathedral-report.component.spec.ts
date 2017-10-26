import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CathedralReportComponent} from './cathedral-report.component';

describe('CathedralReportComponent', () => {
  let component: CathedralReportComponent;
  let fixture: ComponentFixture<CathedralReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CathedralReportComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathedralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
