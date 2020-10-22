import { trigger, transition, style, query, animate, group } from '@angular/animations';

const initial = style({
  position: 'absolute',
  top: '0%',
  left: '0%',
  width: '100%',
  height: '100%'
});
const fromLeft = style({ left: '-100%' });
const toLeft = style({ left: '100%' });
const toMiddle = style({ left: '0%', top: '0%' });
const fromRight = toLeft;
const toRight = fromLeft;
const toTop = style({ top: '-100%' });
const toBottom = style({ top: '100%' });


export const slideInAnimation =
  trigger('routeAnimations', [
    transition(':decrement', [
      style({ position: 'relative' }),
      query(':enter, :leave', [ initial ], { optional: true }),
      query(':enter', [ fromLeft ], { optional: true }),
      group([
        query(':leave', [ animate('300ms ease-out', toLeft ) ], { optional: true }),
        query(':enter', [ animate('300ms ease-out', toMiddle ) ], { optional: true })
      ])
    ]),
    transition(':increment', [
      style({ position: 'relative' }),
      query(':enter, :leave', [ initial ], { optional: true }),
      query(':enter', [ fromRight ], { optional: true }),
      group([
        query(':leave', [ animate('300ms ease-out', toRight ) ], { optional: true }),
        query(':enter', [ animate('300ms ease-out', toMiddle ) ], { optional: true })
      ])
    ]),
    transition('* => podcast', [
      style({ position: 'relative' }),
      query(':enter, :leave', [ initial ], { optional: true }),
      query(':enter', [ toBottom ], { optional: true }),
      group([
        query(':leave', [ animate('300ms ease-out', toTop ) ], { optional: true }),
        query(':enter', [ animate('300ms ease-out', toMiddle ) ], { optional: true })
      ])
    ]),
    transition('podcast => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [ initial ], { optional: true }),
      query(':enter', [ toTop ], { optional: true }),
      group([
        query(':leave', [ animate('300ms ease-out', toBottom ) ], { optional: true }),
        query(':enter', [ animate('300ms ease-out', toMiddle ) ], { optional: true })
      ])
    ])
  ]);