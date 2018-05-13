import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 's2m-rating',
  styleUrls: ['./rating.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.xxxl || breakpoint.width < breakpoints.md ? 'large' : 'xlarge'">
      <nb-tabset fullWidth>
        <nb-tab [tabTitle]="title">
          <div class="contact ng2-smart-row" *ngFor="let u of users; let i = index;" (click)="goToProfile(u.id)">
            <nb-user [picture]="u.photo" [name]="u.name" [title]="row+' '+u.value"
                     size="large"></nb-user>
            <span class="time">{{'#' + (i + 1)}}</span>
          </div>
        </nb-tab>
      </nb-tabset>
    </nb-card>`,
})
export class RatingComponent implements OnInit, OnDestroy {
  @Input() users: any[];
  @Input() title: string;
  @Input() row: string;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private router: Router,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  goToProfile(id: string) {
    this.router.navigate(['pages/profile', id]);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
