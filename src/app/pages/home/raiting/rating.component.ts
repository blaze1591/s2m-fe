import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService} from '@nebular/theme';

@Component({
  selector: 's2m-rating',
  styleUrls: ['./rating.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.xxxl || breakpoint.width < breakpoints.md ? 'large' : 'xlarge'">
      <nb-tabset fullWidth>
        <nb-tab tabTitle="Рейтинг цитувань">
          <div class="contact" *ngFor="let u of users; let i = index;">
            <nb-user [picture]="u.photo" [name]="u.userName" [title]="'Кількість цитувань: '+u.countCit"
                     size="large"></nb-user>
            <span class="time">{{'#' + (i + 1)}}</span>
          </div>
        </nb-tab>
      </nb-tabset>
    </nb-card>`,
})
export class RatingComponent implements OnInit, OnDestroy {
  users: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {
    this.users = [
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user1', countCit: '34',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user2', countCit: '23',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user3', countCit: '21',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user4', countCit: '19',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user5', countCit: '15',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user6', countCit: '9',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user7', countCit: '5',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user8', countCit: '3',
      },
      {
        photo: 'https://res.cloudinary.com/dp2ty4s0z/image/upload/w_200,h_200,c_crop,g_face,r_max/w_200/placeholder_jjhreo.jpg',
        userName: 'user9', countCit: '0',
      },
    ];
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
