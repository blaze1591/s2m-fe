import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService} from '@nebular/theme';

@Component({
  selector: 's2m-rating',
  styleUrls: ['./rating.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.xxxl || breakpoint.width < breakpoints.md ? 'large' : 'xlarge'">
      <nb-tabset fullWidth>
        <nb-tab tabTitle="Рейтинг цитувань">
          <div class="contact" *ngFor="let u of users; let i = index;">
            <nb-user [picture]="u.photo" [name]="u.name" [title]="'Кількість цитувань: '+u.value"
                     size="large"></nb-user>
            <span class="time">{{'#' + (i + 1)}}</span>
          </div>
        </nb-tab>
      </nb-tabset>
    </nb-card>`,
})
export class RatingComponent implements OnInit, OnDestroy {
  @Input() users: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
