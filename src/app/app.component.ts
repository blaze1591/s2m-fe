import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './services/utils/analytics.service';

@Component({
  selector: 's2m-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
