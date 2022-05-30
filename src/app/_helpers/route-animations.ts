import {animate, keyframes, query, style, transition, trigger, useAnimation} from '@angular/animations';
import {bounceIn, bounceOut} from 'ng-animate';


export const fadeAnimation =
  trigger('fadeAnimation', [
    transition('* <=> *', [
      query(':enter',
        style({
          position: 'fixed',
          width: '100%',
          transform: 'translateX(-100%)'
        }),
        {optional: true}),

      query(':leave',
        animate('400ms ease',
          keyframes([style({
            position: 'fixed',
            width: '100%',
            transform: 'translateX(100%)'
          })])
        ),
        {optional: true}),

      query(':enter',
        animate('400ms ease',
          keyframes([style({
            opacity: 1,
            transform: 'translateX(0%)'
          })])
        ),
        {optional: true}),
    ])
  ]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('200ms ease-in', keyframes([style({transform: 'translateY(0%)'})]))
  ]),
  transition(':leave', [
    animate('200ms ease-in', keyframes([style({transform: 'translateX(100%)'})]))
  ])
]);

export const bounces = trigger('bounces', [transition(':enter', useAnimation(bounceIn, {
  params: {
    timing: 0.5
  }
})),
  transition(':leave', useAnimation(bounceOut, {
    params: {
      timing: 0.5
    }
  }))]);

