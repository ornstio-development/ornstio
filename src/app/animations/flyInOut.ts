import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const flyInOutLeft = trigger('flyInOutLeft', [
    state('in', style({ transform: 'translateX(0)' })),
    transition(':enter', [
        animate('100ms', keyframes([
            style({
                transform: 'scaleX(0)',
                'transform-origin': '0% 100%',
                offset: 0
            }),
            style({
                transform: 'scaleX(1)',
                offset: 1.0
            })
        ]))
    ]),
    transition(':leave', [
        animate('200ms', keyframes([
            style({
                transform: 'scaleX(1)',
                'transform-origin': '0% 100%',
                offset: 0
            }),
            style({
                transform: 'scaleX(0)',
                offset: 1.0
            })
        ]))
    ])
]);