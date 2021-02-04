import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, forkJoin, of } from 'rxjs';
import { Color } from 'src/app/models/color';
import { map, delay, first } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  red: Color;
  red$ = of(null)
    .pipe(
      map(() => {
        return Color.FromRgb(150, 0, 0);
      })
    );
  green: Color;
  green$ = of(null)
    .pipe(
      map(() => {
        return Color.FromRgb(0, 50, 0);
      })
    );
  blue: Color;
  blue$ = of(null)
    .pipe(
      map(() => {
        return Color.FromRgb(0, 0, 150);
      })
    );

  color: Color;

  private destroy = new Subject<void>();

  constructor() { }

  ngOnInit() {

  }

  begin() {
    forkJoin([
      this.red$.pipe(first()).pipe(map((red) => {
        return this.red = red;
      })),
      this.green$.pipe(first()).pipe(delay(2500)).pipe(map((green) => {
        return this.green = green;
      })),
      this.blue$.pipe(first()).pipe(delay(5000)).pipe(map((blue) => {
        return this.blue = blue;
      }))
    ]).pipe(first()).subscribe((colors: Color[]) => {
      this.color = Color.FromRgb(
        colors[0].rgb[0],
        colors[1].rgb[1],
        colors[2].rgb[2]
      )
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
