import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultiesReportComponent} from './faculties-report.component';

describe('FacultiesReportComponent', () => {
  let component: FacultiesReportComponent;
  let fixture: ComponentFixture<FacultiesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultiesReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultiesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
