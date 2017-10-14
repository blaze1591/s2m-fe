import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'EXTRAS',
    group: true,
  },
  {
    title: 'Extras',
    icon: 'nb-keypad',
    link: '/pages/extras',
    children: [
      {
        title: 'Some children topic 1',
        link: '/pages/extras/child1',
      },
    ],
  },
];
