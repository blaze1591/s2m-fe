import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Дашборд',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Функції',
    group: true,
  },
  {
    title: 'Співробітники',
    icon: 'nb-person',
    link: '/pages/employees',
  },
  {
    title: 'Публікації',
    icon: 'nb-compose',
    link: '/pages/publications',
  },
  {
    title: 'Звіти',
    icon: 'nb-title',
    link: '/pages/reports',
    children: [
      {
        title: 'Індивідуальний',
        link: '/pages/reports/individual',
      },
      {
        title: 'Кафедральний',
        link: '/pages/reports/cathedral',
      },
      {
        title: 'Факультети',
        link: '/pages/reports/faculties',
      },
      {
        title: 'Інститути',
        link: '/pages/reports/institutes',
      },
      {
        title: 'Скопус',
        link: '/pages/reports/scopus',
      },
    ],
  },
];
